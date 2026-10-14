import { createSystem, Vector3, VisibilityState } from '@iwsdk/core';
import type { Entity } from '@iwsdk/core';
import { CardVisual } from './card-visual.js';
import { Card, CardZones, Lamp } from './components.js';
import { DeskDressing } from './desk-dressing.js';
import type { ZoneHighlight } from './desk-dressing.js';
import {
  CARD_DEPTH,
  CARD_WIDTH,
  FLOAT_TILT_RAD,
  POOL_RADIUS,
  POOL_X,
  POOL_Z,
  SLOT_COUNT,
  SLOT_Z,
  TRAY_Z,
  classifyDrop,
  clampToDesk,
  doneX,
  fanPosition,
  laterX,
  slotX,
} from './layout.js';
import type { DropTarget } from './layout.js';
import { PageOverlay } from './page.js';
import { Pointer, PointerTracker } from './pointers.js';
import type { PointerId } from './pointers.js';
import { SMALLER_STEP_PROMPT, STARTER_CARDS, proposeKeep, shouldOfferSmallerStep } from './rules.js';
import { Sound } from './sound.js';
import { clearState, loadState, newCardId, saveState, tomorrowCards } from './store.js';
import type { SavedCard, SavedState, SavedZone } from './store.js';
import { SurfaceProbe } from './surface.js';

type Phase = 'placing' | 'settling' | 'asleep' | 'awake' | 'off';

const BLANK_ID = 'blank';
const TAP_DISTANCE = 0.012;
const TAP_SECONDS = 0.5;
const NEAR_MARGIN = 0.02;
const CHAIN_NEAR = 0.035;
const CHAIN_FAR = 0.03;

interface CardRuntime {
  id: string;
  saved: SavedCard | null;
  entity: Entity;
  visual: CardVisual;
  x: number;
  z: number;
  tx: number;
  tz: number;
  lift: number;
  fade: number;
  fadeTarget: number;
  order: number;
  removing: boolean;
  pulse: number;
}

interface Hold {
  pointer: Pointer;
  kind: 'card' | 'lamp' | 'chain';
  cardId: string;
  far: boolean;
  offsetX: number;
  offsetZ: number;
  startX: number;
  startZ: number;
  startTime: number;
  moved: number;
  lampOffset: Vector3;
  lampStart: Vector3;
  lampDistance: number;
  chainStartY: number;
  pull: number;
  /** Take the grab offset on the first frame after the pinch closes. */
  needsAnchor: boolean;
}

/**
 * The Lamplight ritual: place the lamp, pull the chain, sort cards by sliding
 * them across the desk, pull the chain to switch off. All card positions are
 * kept in the lamp's local frame and saved on every change.
 */
export class RitualSystem extends createSystem({
  lamps: { required: [Lamp] },
  cards: { required: [Card] },
}) {
  private lamp: Entity | null = null;
  private dressing: DeskDressing | null = null;
  private pointers!: PointerTracker;
  private probe!: SurfaceProbe;
  private page!: PageOverlay;
  private sound!: Sound;
  private state!: SavedState;
  private readonly runtimes = new Map<string, CardRuntime>();
  private readonly holds = new Map<PointerId, Hold>();

  private phase: Phase = 'asleep';
  private afterPlacing: Phase = 'asleep';
  private immersive = false;
  private floating = false;
  private homePosition = new Vector3();
  private light = 0;
  private yaw = 0;
  private yawTarget = 0;
  private sweepT = -1;
  private orderCounter = 1;
  private slotsShown = false;
  private sidesShown = false;
  private editing = false;
  private gateWarned = false;
  private choseThisSession = false;
  private proposalId = '';
  private readonly pendingRetire = new Set<string>();
  private readonly sessionStartIds = new Set<string>();
  private readonly offeredSmaller = new Set<string>();
  private time = 0;
  private placeInFrames = -1;

  // Scratch values reused every frame.
  private readonly v1 = new Vector3();
  private readonly v2 = new Vector3();
  private readonly v3 = new Vector3();
  private readonly eye = new Vector3();
  private readonly deskPoint = { x: 0, z: 0 };
  private readonly fanPoint = { x: 0, z: 0 };

  init(): void {
    this.state = loadState();
    this.sound = new Sound();
    this.page = new PageOverlay(() => {
      clearState();
      location.reload();
    });
    this.page.showTomorrow(tomorrowCards(this.state));

    this.pointers = new PointerTracker(this.world.renderer, this.world.camera, this.player, {
      onStart: (p) => this.onPinchStart(p),
      onEnd: (p) => this.onPinchEnd(p),
    });
    this.probe = new SurfaceProbe(this.world.renderer, this.player);

    const input = this.page.input;
    const onInput = () => this.updateDraft();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.commitWriting();
      } else if (e.key === 'Escape') {
        input.value = '';
        this.commitWriting();
      }
    };
    const onBlur = () => this.commitWriting();
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKey);
    input.addEventListener('blur', onBlur);

    this.cleanupFuncs.push(
      () => input.removeEventListener('input', onInput),
      () => input.removeEventListener('keydown', onKey),
      () => input.removeEventListener('blur', onBlur),
      () => this.pointers.dispose(),
      () => this.probe.cancel(),
      this.queries.lamps.subscribe('qualify', (entity) => this.attachLamp(entity)),
      this.world.visibilityState.subscribe((v) => this.onVisibility(v)),
    );
    const existing = this.queries.lamps.entities.values().next().value;
    if (existing) this.attachLamp(existing);
  }

  // ---------------------------------------------------------------- setup

  private attachLamp(entity: Entity): void {
    if (this.lamp) return;
    this.lamp = entity;
    this.homePosition.copy(entity.object3D!.position);
    this.dressing = new DeskDressing(this.world, entity);
    this.dressing.setMirrored(this.state.mirrored);
    this.dressing.setTrayVisible(true);
    this.chainRestY = this.dressing.chain.position.y;
    // Remove anything retired in a session that was quit before switch-off.
    this.state.cards = this.state.cards.filter((c) => c.zone !== 'done');
    for (const saved of this.state.cards) this.spawnCard(saved.id, saved, saved.x, saved.z);
    this.phase = this.state.sessions > 0 && tomorrowCards(this.state).length > 0 ? 'off' : 'asleep';
    if (this.phase === 'off') this.dressing.showPreview(tomorrowCards(this.state));
    this.applyCardVisibility();
  }

  private onVisibility(v: VisibilityState): void {
    const immersive = v !== VisibilityState.NonImmersive;
    if (immersive === this.immersive || !this.lamp || !this.dressing) return;
    this.immersive = immersive;
    this.page.setImmersive(immersive);
    const session = this.world.renderer.xr.getSession();
    if (immersive && session) {
      this.pointers.attachSession(session);
      this.sound.unlock();
      // The head pose is only valid once XR frames run; place after a few.
      this.placeInFrames = 3;
    } else {
      this.pointers.detachSession();
      this.probe.cancel();
      if (this.phase === 'placing' || this.phase === 'settling') this.phase = this.afterPlacing;
      const lamp = this.lamp.object3D!;
      lamp.position.copy(this.homePosition);
      lamp.rotation.set(0, 0, 0);
      this.floating = false;
      this.dressing.setTrayVisible(true);
      this.dressing.ghost.hide();
    }
  }

  /** Put the lamp ahead of the user, low and central, to be slid down. */
  private beginPlacing(): void {
    const lamp = this.lamp!.object3D!;
    this.afterPlacing = this.phase === 'placing' || this.phase === 'settling' ? this.afterPlacing : this.phase;
    this.phase = 'placing';
    this.world.camera.getWorldPosition(this.eye);
    this.world.camera.getWorldDirection(this.v1);
    this.v1.y = 0;
    if (this.v1.lengthSq() < 1e-4) this.v1.set(0, 0, -1);
    this.v1.normalize();
    lamp.position.copy(this.eye).addScaledVector(this.v1, 0.5);
    lamp.position.y = this.eye.y - 0.3;
    this.faceUser(0);
    this.dressing!.setTrayVisible(false);
    if (this.state.sessions === 0) {
      this.v2.set(0, 0.12, 0.02);
      this.v3.set(0, -0.12, 0.02);
      this.dressing!.ghost.show(this.v2, this.v3);
    }
  }

  private spawnCard(id: string, saved: SavedCard | null, x: number, z: number): CardRuntime {
    const visual = new CardVisual(saved ? `Card_${id}` : 'BlankCard');
    const entity = this.world.createTransformEntity(visual.root, { parent: this.lamp! });
    entity.addComponent(Card, {
      cardId: id,
      zone: saved ? saved.zone : CardZones.Blank,
      slotIndex: saved ? saved.slotIndex : -1,
    });
    const rt: CardRuntime = {
      id,
      saved,
      entity,
      visual,
      x,
      z,
      tx: x,
      tz: z,
      lift: 0,
      fade: 0,
      fadeTarget: 0,
      order: this.orderCounter++,
      removing: false,
      pulse: 0,
    };
    this.runtimes.set(id, rt);
    this.redraw(rt);
    if (saved) visual.setCurl(Math.min(1, saved.carries / 2));
    visual.root.position.set(x, 0, z);
    return rt;
  }

  private redraw(rt: CardRuntime): void {
    if (rt.saved) {
      rt.visual.draw({ kind: 'text', text: rt.saved.text, done: rt.saved.zone === 'done', own: rt.saved.own });
    } else {
      rt.visual.draw({ kind: 'blank', draft: this.page.input.value, editing: this.editing });
    }
  }

  private setZone(rt: CardRuntime, zone: SavedZone, slotIndex = -1): void {
    if (!rt.saved) return;
    rt.saved.zone = zone;
    rt.saved.slotIndex = slotIndex;
    rt.entity.setValue(Card, 'zone', zone);
    rt.entity.setValue(Card, 'slotIndex', slotIndex);
  }

  /** Cards show only while the lamp is on; the blank shows once retiring is done. */
  private applyCardVisibility(): void {
    const awake = this.phase === 'awake' || (this.phase === 'placing' && this.afterPlacing === 'awake');
    for (const rt of this.runtimes.values()) {
      if (rt.removing) continue;
      const show = awake && (rt.saved !== null || this.pendingRetire.size === 0);
      rt.fadeTarget = show ? 1 : 0;
    }
  }

  private save(): void {
    for (const rt of this.runtimes.values()) {
      if (!rt.saved) continue;
      rt.saved.x = rt.tx;
      rt.saved.z = rt.tz;
    }
    saveState(this.state);
  }

  // ---------------------------------------------------------------- chain

  private pullChain(): void {
    this.sound.chainClick();
    if (this.phase === 'awake') this.switchOff();
    else if (this.phase === 'asleep' || this.phase === 'off') this.wake();
  }

  private wake(): void {
    const dressing = this.dressing!;
    this.phase = 'awake';
    this.lamp!.setValue(Lamp, 'awake', true);
    dressing.hidePreview();
    dressing.ghost.hide();
    this.sound.setHum(true);
    this.sweepT = 0;
    this.choseThisSession = false;
    this.gateWarned = false;
    this.proposalId = '';
    this.offeredSmaller.clear();
    this.sessionStartIds.clear();
    this.pendingRetire.clear();
    for (const saved of this.state.cards) {
      this.sessionStartIds.add(saved.id);
      if (saved.zone === 'slot') this.pendingRetire.add(saved.id);
    }

    const firstRun = this.state.sessions === 0;
    if (firstRun && this.state.cards.length === 0) {
      STARTER_CARDS.forEach((text) => {
        const saved: SavedCard = {
          id: newCardId(),
          text,
          own: false,
          zone: 'loose',
          slotIndex: -1,
          x: 0,
          z: 0,
          carries: 0,
          bornSession: 0,
        };
        this.state.cards.push(saved);
        // Starters fan out from under the lamp.
        this.placeInFan(this.spawnCard(saved.id, saved, 0, SLOT_Z));
      });
    }
    if (!this.runtimes.has(BLANK_ID)) this.placeInFan(this.spawnCard(BLANK_ID, null, 0, SLOT_Z));
    this.slotsShown = !firstRun || this.state.cards.some((c) => c.own);
    this.sidesShown = !firstRun;
    this.applyCardVisibility();
    this.save();

    if (this.pendingRetire.size > 0) dressing.say("Start with last time's three", 5);
    else if (firstRun) dressing.say('Lamp on', 2);
    else dressing.say('Lamp on', 2);
  }

  private switchOff(): void {
    const dressing = this.dressing!;
    const firstRun = this.state.sessions === 0;
    const ownPlaced = this.state.cards.some((c) => c.own && c.zone === 'slot');
    if (firstRun && !ownPlaced && !this.gateWarned) {
      // The first run ends with one of the user's own cards under the light.
      this.gateWarned = true;
      this.sound.dip();
      this.dipT = 0;
      dressing.say(this.state.cards.some((c) => c.own) ? 'Slide yours under the light' : 'Write one of your own', 4);
      return;
    }
    this.editing = false;
    this.page.input.blur();
    for (const saved of this.state.cards) {
      if (saved.zone !== 'done' && this.sessionStartIds.has(saved.id)) saved.carries += 1;
    }
    for (const rt of [...this.runtimes.values()]) {
      if (rt.saved?.zone === 'done') this.removeCard(rt, false);
    }
    this.state.cards = this.state.cards.filter((c) => c.zone !== 'done');
    this.state.sessions += 1;
    for (const rt of this.runtimes.values()) {
      if (rt.saved) rt.visual.setCurl(Math.min(1, rt.saved.carries / 2));
    }
    this.save();

    this.phase = 'off';
    this.lamp!.setValue(Lamp, 'awake', false);
    this.sound.setHum(false);
    this.yawTarget = 0;
    this.proposalId = '';
    const tomorrow = tomorrowCards(this.state);
    dressing.showPreview(tomorrow);
    this.page.showTomorrow(tomorrow);
    dressing.ghost.hide();
    this.applyCardVisibility();
    if (tomorrow.length === SLOT_COUNT) {
      this.sound.settle();
      dressing.say('Lamp off. Tomorrow is set.', 5);
    } else {
      dressing.say('Lamp off', 3);
    }
  }

  private dipT = -1;

  // ---------------------------------------------------------------- picking

  private onPinchStart(p: Pointer): void {
    this.sound.unlock();
    if (this.holds.has(p.id) || !this.lamp || !this.dressing) return;
    const lamp = this.lamp.object3D!;
    lamp.updateWorldMatrix(true, true);
    const phase = this.phase;
    if (phase === 'settling') return;

    // 1. The chain bead, in every phase but placing.
    if (phase !== 'placing' && this.hitsChain(p)) {
      this.startHold(p, 'chain', '', !p.hasTip || !this.nearChain(p));
      return;
    }
    // 2. A card, while the lamp is on.
    if (phase === 'awake') {
      const picked = this.pickCard(p);
      if (picked) {
        this.startHold(p, 'card', picked.id, picked.far);
        return;
      }
    }
    // 3. The lamp itself: place it, or re-place it in one gesture.
    const lampHit = this.hitsLamp(p, phase === 'placing');
    if (lampHit) this.startHold(p, 'lamp', '', lampHit === 'far');
  }

  private startHold(p: Pointer, kind: Hold['kind'], cardId: string, far: boolean): void {
    const hold: Hold = {
      pointer: p,
      kind,
      cardId,
      far,
      offsetX: 0,
      offsetZ: 0,
      startX: 0,
      startZ: 0,
      startTime: this.time,
      moved: 0,
      lampOffset: new Vector3(),
      lampStart: new Vector3().copy(this.lamp!.object3D!.position),
      lampDistance: 0,
      chainStartY: 0,
      pull: 0,
      needsAnchor: true,
    };
    const lamp = this.lamp!.object3D!;
    if (kind === 'card') {
      const rt = this.runtimes.get(cardId)!;
      hold.startX = rt.tx;
      hold.startZ = rt.tz;
      rt.order = this.orderCounter++;
      rt.entity.setValue(Card, 'held', true);
      if (rt.saved && shouldOfferSmallerStep(rt.saved) && !this.offeredSmaller.has(rt.id)) {
        this.offeredSmaller.add(rt.id);
        this.dressing!.say(SMALLER_STEP_PROMPT, 4);
      }
    } else if (kind === 'lamp') {
      if (far) {
        hold.lampDistance = Math.max(0.15, lamp.position.distanceTo(p.rayOrigin));
        this.v1.copy(p.rayOrigin).addScaledVector(p.rayDir, hold.lampDistance);
        hold.lampOffset.copy(lamp.position).sub(this.v1);
      } else {
        hold.lampOffset.copy(lamp.position).sub(p.tip);
      }
      if (this.state.sessions === 0 && this.phase === 'placing' && p.id !== 'mouse') {
        // Whichever hand places the lamp first sets the side trays' layout.
        this.state.mirrored = p.id === 'left';
        this.dressing!.setMirrored(this.state.mirrored);
      }
      this.dressing!.ghost.hide();
    } else {
      hold.chainStartY = p.hasTip ? p.tip.y : 0;
    }
    this.holds.set(p.id, hold);
  }

  /** Lamp-local desk point under a fingertip (near) or along a ray (far). */
  private deskPointFor(p: Pointer, far: boolean, out: { x: number; z: number }): boolean {
    const lamp = this.lamp!.object3D!;
    if (!far && p.hasTip) {
      this.v1.copy(p.tip);
      lamp.worldToLocal(this.v1);
      out.x = this.v1.x;
      out.z = this.v1.z;
      return true;
    }
    if (!p.hasRay) return false;
    this.v1.copy(p.rayOrigin);
    lamp.worldToLocal(this.v1);
    this.v2.copy(p.rayOrigin).add(p.rayDir);
    lamp.worldToLocal(this.v2);
    this.v2.sub(this.v1);
    if (this.v2.y > -1e-4) return false;
    const t = -this.v1.y / this.v2.y;
    if (t < 0 || t > 3) return false;
    out.x = this.v1.x + this.v2.x * t;
    out.z = this.v1.z + this.v2.z * t;
    return true;
  }

  private pickCard(p: Pointer): { id: string; far: boolean } | null {
    let best: CardRuntime | null = null;
    let far = false;
    const lamp = this.lamp!.object3D!;
    const tryPick = (x: number, z: number, margin: number) => {
      for (const entity of this.queries.cards.entities) {
        const rt = this.runtimes.get(entity.getValue(Card, 'cardId') as string);
        if (!rt || rt.removing || rt.fade < 0.5 || this.isHeld(rt.id)) continue;
        if (Math.abs(x - rt.tx) < CARD_WIDTH / 2 + margin && Math.abs(z - rt.tz) < CARD_DEPTH / 2 + margin) {
          if (!best || rt.order > best.order) best = rt;
        }
      }
    };
    if (p.hasTip) {
      this.v3.copy(p.tip);
      lamp.worldToLocal(this.v3);
      if (this.v3.y > -0.03 && this.v3.y < 0.05) tryPick(this.v3.x, this.v3.z, NEAR_MARGIN);
    }
    if (!best && this.deskPointFor(p, true, this.deskPoint)) {
      far = true;
      tryPick(this.deskPoint.x, this.deskPoint.z, 0.004);
    }
    return best ? { id: (best as CardRuntime).id, far } : null;
  }

  private isHeld(cardId: string): boolean {
    for (const hold of this.holds.values()) if (hold.kind === 'card' && hold.cardId === cardId) return true;
    return false;
  }

  private nearChain(p: Pointer): boolean {
    if (!p.hasTip) return false;
    this.dressing!.chainBead.getWorldPosition(this.v1);
    return this.v1.distanceTo(p.tip) < CHAIN_NEAR;
  }

  private hitsChain(p: Pointer): boolean {
    if (this.nearChain(p)) return true;
    if (!p.hasRay) return false;
    this.dressing!.chainBead.getWorldPosition(this.v1);
    return rayPointDistance(p.rayOrigin, p.rayDir, this.v1, this.v2) < CHAIN_FAR;
  }

  /** Near: the hand is at the lamp body. Far: the ray passes the lamp's axis. */
  private hitsLamp(p: Pointer, generous: boolean): 'near' | 'far' | null {
    const lamp = this.lamp!.object3D!;
    if (p.hasTip) {
      this.v1.copy(p.tip);
      lamp.worldToLocal(this.v1);
      const radial = Math.hypot(this.v1.x, this.v1.z - (this.v1.y > 0.2 ? 0.05 : 0));
      if (this.v1.y > -0.03 && this.v1.y < 0.33 && radial < (generous ? 0.1 : 0.065)) return 'near';
    }
    if (!p.hasRay) return null;
    lamp.getWorldPosition(this.v1);
    this.v1.y += 0.14;
    const d = rayPointDistance(p.rayOrigin, p.rayDir, this.v1, this.v2);
    return d < (generous ? 0.16 : 0.08) ? 'far' : null;
  }

  // ---------------------------------------------------------------- release

  private onPinchEnd(p: Pointer): void {
    const hold = this.holds.get(p.id);
    if (!hold) return;
    this.holds.delete(p.id);
    const tap = hold.moved < TAP_DISTANCE && this.time - hold.startTime < TAP_SECONDS;
    if (hold.kind === 'chain') {
      this.dressing!.chain.position.y = this.chainRestY;
      // A pull, or a simple pinch on the bead for the pointer-only route.
      if (hold.pull > 0.01 || tap || hold.far) this.pullChain();
      return;
    }
    if (hold.kind === 'lamp') {
      this.releaseLamp(tap);
      return;
    }
    const rt = this.runtimes.get(hold.cardId);
    if (!rt) return;
    rt.entity.setValue(Card, 'held', false);
    rt.lift = 0.006;
    if (!rt.saved) {
      if (tap) {
        // Synchronous with the pinch event, so the system keyboard may open.
        this.beginWriting();
      } else if (classifyDrop(rt.tx, rt.tz, this.state.mirrored).kind !== 'loose') {
        this.returnCard(rt, hold);
      }
      return;
    }
    if (tap) return;
    this.dropCard(rt, hold, classifyDrop(rt.tx, rt.tz, this.state.mirrored));
    this.dressing!.setHighlight(null);
    this.save();
  }

  private chainRestY = Number.NaN;

  private returnCard(rt: CardRuntime, hold: Hold): void {
    rt.tx = hold.startX;
    rt.tz = hold.startZ;
    this.sound.dip();
  }

  private slotOccupant(index: number, except: CardRuntime): CardRuntime | null {
    for (const rt of this.runtimes.values()) {
      if (rt !== except && !rt.removing && rt.saved?.zone === 'slot' && rt.saved.slotIndex === index) return rt;
    }
    return null;
  }

  private dropCard(rt: CardRuntime, hold: Hold, target: DropTarget): void {
    const saved = rt.saved!;
    const dressing = this.dressing!;
    const wasRetiring = this.pendingRetire.delete(rt.id);
    if (target.kind === 'slot' && !this.slotsShown) target = { kind: 'loose' };
    if ((target.kind === 'later' || target.kind === 'done') && !this.sidesShown) target = { kind: 'loose' };

    switch (target.kind) {
      case 'slot': {
        if (this.slotOccupant(target.index, rt)) {
          // One card per slot: a taken slot never silently swaps.
          this.returnCard(rt, hold);
          dressing.say('That slot is taken', 2.5);
          break;
        }
        this.setZone(rt, 'slot', target.index);
        rt.tx = slotX(target.index);
        rt.tz = SLOT_Z;
        this.sound.slotKnock();
        this.choseThisSession = true;
        this.clearProposal();
        dressing.ghost.hide();
        const filled = this.state.cards.filter((c) => c.zone === 'slot').length;
        if (filled === SLOT_COUNT) {
          dressing.say('Three set. Pull the chain.', 0);
          this.v2.set(0, 0, 0);
          this.dressing!.chainBead.getWorldPosition(this.v1);
          this.lamp!.object3D!.worldToLocal(this.v1);
          this.v2.copy(this.v1);
          this.v2.y -= 0.03;
          if (this.state.sessions === 0) dressing.ghost.show(this.v1, this.v2);
        } else {
          dressing.say(`[knock] Slot ${target.index + 1}`, 1.5);
        }
        break;
      }
      case 'later': {
        this.setZone(rt, 'later');
        const n = this.countZone('later', rt);
        rt.tx = laterX(this.state.mirrored) + ((n % 3) - 1) * 0.004;
        rt.tz = TRAY_Z - 0.006 + (n % 3) * 0.005;
        this.sound.slotKnock();
        dressing.say('[knock] Later', 1.5);
        break;
      }
      case 'done': {
        this.setZone(rt, 'done');
        const n = this.countZone('done', rt);
        rt.tx = doneX(this.state.mirrored) + ((n % 3) - 1) * 0.004;
        rt.tz = TRAY_Z + (n % 3) * 0.004;
        dressing.dropStamp(rt.tx, rt.tz, () => {
          this.sound.stamp();
          this.redraw(rt);
          dressing.say('[stamp] Done', 1.5);
        });
        break;
      }
      case 'letGo': {
        this.state.cards = this.state.cards.filter((c) => c.id !== rt.id);
        this.removeCard(rt, true);
        this.sound.letGo();
        dressing.say('Let go', 1.5);
        break;
      }
      case 'loose':
        this.setZone(rt, 'loose');
        break;
    }
    if (wasRetiring && this.pendingRetire.size === 0) {
      this.applyCardVisibility();
      if (this.runtimes.has(BLANK_ID)) dressing.say('Add anything new', 3);
    }
  }

  private countZone(zone: SavedZone, except: CardRuntime): number {
    let n = 0;
    for (const rt of this.runtimes.values()) if (rt !== except && !rt.removing && rt.saved?.zone === zone) n += 1;
    return n;
  }

  private removeCard(rt: CardRuntime, animate: boolean): void {
    rt.removing = true;
    rt.fadeTarget = 0;
    if (animate) {
      const dx = rt.tx - POOL_X;
      const dz = rt.tz - POOL_Z;
      const d = Math.hypot(dx, dz) || 1;
      rt.tx += (dx / d) * 0.08;
      rt.tz += (dz / d) * 0.08;
    } else {
      rt.fade = 0;
    }
  }

  /** Move a card to the first free spot in the front fan rows. */
  private placeInFan(target: CardRuntime): void {
    for (let i = 0; i < 8; i += 1) {
      fanPosition(i, 8, this.fanPoint);
      let free = true;
      for (const rt of this.runtimes.values()) {
        if (rt === target || rt.removing) continue;
        if (Math.abs(rt.tx - this.fanPoint.x) < CARD_WIDTH * 0.9 && Math.abs(rt.tz - this.fanPoint.z) < CARD_DEPTH * 0.9) {
          free = false;
          break;
        }
      }
      if (free) break;
    }
    target.tx = this.fanPoint.x;
    target.tz = this.fanPoint.z;
  }

  // ---------------------------------------------------------------- writing

  private beginWriting(): void {
    if (this.editing) return;
    this.editing = true;
    const input = this.page.input;
    input.value = '';
    input.focus();
    const blank = this.runtimes.get(BLANK_ID);
    if (blank) this.redraw(blank);
    this.dressing!.say('Type it, then Enter', 0);
  }

  private updateDraft(): void {
    const blank = this.runtimes.get(BLANK_ID);
    if (blank && this.editing) this.redraw(blank);
  }

  private commitWriting(): void {
    if (!this.editing) return;
    this.editing = false;
    const input = this.page.input;
    const text = input.value.trim().replace(/\s+/gu, ' ');
    input.value = '';
    if (document.activeElement === input) input.blur();
    const blank = this.runtimes.get(BLANK_ID);
    if (!blank) return;
    this.dressing!.say('', 0);
    if (!text) {
      this.redraw(blank);
      return;
    }
    const saved: SavedCard = {
      id: newCardId(),
      text,
      own: true,
      zone: 'loose',
      slotIndex: -1,
      x: blank.tx,
      z: blank.tz,
      carries: 0,
      bornSession: this.state.sessions,
    };
    this.state.cards.push(saved);
    const rt = this.spawnCard(saved.id, saved, blank.tx, blank.tz);
    rt.fade = 1;
    rt.fadeTarget = 1;
    this.redraw(blank);
    this.placeInFan(blank);
    this.save();
    if (!this.slotsShown) {
      this.slotsShown = true;
      this.sidesShown = true;
      this.dressing!.say('Slide three under the light', 0);
      this.v1.set(rt.tx, 0.01, rt.tz);
      this.v2.set(slotX(1), 0.01, SLOT_Z);
      this.dressing!.ghost.show(this.v1, this.v2);
    }
  }

  // ---------------------------------------------------------------- lamp

  private releaseLamp(tap: boolean): void {
    const lamp = this.lamp!.object3D!;
    const resume: Phase = this.phase === 'placing' ? this.afterPlacing : this.phase;
    if (!this.immersive) {
      // Outside the headset the lamp stands on the virtual desk.
      if (tap) return;
      lamp.position.y = this.homePosition.y;
      this.save();
      return;
    }
    if (tap && this.phase !== 'placing') return;
    this.phase = 'settling';
    lamp.getWorldPosition(this.v1);
    this.probe.probe(this.v1, (result) => {
      if (result.found) {
        lamp.position.y += result.y - this.v1.y;
        this.floating = false;
      } else {
        this.floating = true;
      }
      this.faceUser(this.floating ? FLOAT_TILT_RAD : 0);
      this.dressing!.setTrayVisible(this.floating);
      this.phase = resume;
      this.applyCardVisibility();
      if (resume === 'asleep' || resume === 'off') {
        if (this.state.sessions === 0) {
          this.dressing!.chainBead.getWorldPosition(this.v2);
          lamp.worldToLocal(this.v2);
          this.v3.copy(this.v2);
          this.v3.y -= 0.03;
          this.dressing!.ghost.show(this.v2, this.v3);
        }
        this.dressing!.say(this.floating ? 'No desk found. Tray instead.' : 'Pull the chain', 4);
      }
    });
  }

  /** Turn the lamp so its front faces the viewer; tilt toward them if floating. */
  private faceUser(tilt: number): void {
    const lamp = this.lamp!.object3D!;
    this.world.camera.getWorldPosition(this.eye);
    const yaw = Math.atan2(this.eye.x - lamp.position.x, this.eye.z - lamp.position.z);
    lamp.rotation.set(tilt, yaw, 0, 'YXZ');
  }

  private clearProposal(): void {
    const rt = this.runtimes.get(this.proposalId);
    if (rt) rt.pulse = 0;
    this.proposalId = '';
    this.yawTarget = 0;
  }

  /** Point at what the lamp would keep, only with a true reason. */
  private maybePropose(): void {
    if (this.choseThisSession || this.proposalId || this.pendingRetire.size > 0) return;
    const proposal = proposeKeep(this.state.cards);
    if (!proposal) return;
    const rt = this.runtimes.get(proposal.cardId);
    if (!rt) return;
    this.proposalId = proposal.cardId;
    rt.pulse = 1;
    this.yawTarget = clamp(Math.atan2(rt.tx, rt.tz - 0.0), -0.7, 0.7);
    this.dressing!.say(proposal.reason, 4);
  }

  // ---------------------------------------------------------------- frame

  update(delta: number, time: number): void {
    if (!this.lamp || !this.dressing) return;
    this.time = time;
    const dressing = this.dressing;
    const lamp = this.lamp.object3D!;
    this.pointers.update();
    this.probe.update(delta);
    if (this.placeInFrames >= 0 && this.placeInFrames-- === 0 && this.immersive) this.beginPlacing();

    let scrape = 0;
    let highlight: ZoneHighlight = null;
    for (const hold of this.holds.values()) {
      const p = hold.pointer;
      if (hold.kind === 'lamp') {
        if (hold.far && p.hasRay) {
          this.v1.copy(p.rayOrigin).addScaledVector(p.rayDir, hold.lampDistance).add(hold.lampOffset);
        } else if (p.hasTip) {
          if (hold.needsAnchor) hold.lampOffset.copy(hold.lampStart).sub(p.tip);
          this.v1.copy(p.tip).add(hold.lampOffset);
        } else continue;
        hold.needsAnchor = false;
        if (!this.immersive) this.v1.y = this.homePosition.y;
        hold.moved = Math.max(hold.moved, this.v1.distanceTo(hold.lampStart));
        lamp.position.copy(this.v1);
        this.faceUser(0);
      } else if (hold.kind === 'chain') {
        if (hold.needsAnchor && p.hasTip) hold.chainStartY = p.tip.y;
        hold.needsAnchor = false;
        const pull = p.hasTip && !hold.far ? clamp(hold.chainStartY - p.tip.y, 0, 0.03) : 0;
        hold.pull = Math.max(hold.pull, pull);
        dressing.chain.position.y = this.chainRestY - pull;
      } else {
        const rt = this.runtimes.get(hold.cardId);
        if (!rt || !this.deskPointFor(p, hold.far, this.deskPoint)) continue;
        if (hold.needsAnchor) {
          hold.needsAnchor = false;
          hold.offsetX = hold.startX - this.deskPoint.x;
          hold.offsetZ = hold.startZ - this.deskPoint.z;
        }
        this.deskPoint.x += hold.offsetX;
        this.deskPoint.z += hold.offsetZ;
        clampToDesk(this.deskPoint);
        const step = Math.hypot(this.deskPoint.x - rt.tx, this.deskPoint.z - rt.tz);
        scrape = Math.max(scrape, step / Math.max(delta, 1e-3));
        hold.moved = Math.max(hold.moved, Math.hypot(this.deskPoint.x - hold.startX, this.deskPoint.z - hold.startZ));
        rt.tx = this.deskPoint.x;
        rt.tz = this.deskPoint.z;
        rt.lift = 0.012;
        if (rt.saved) {
          const drop = classifyDrop(rt.tx, rt.tz, this.state.mirrored);
          if (drop.kind === 'slot' && this.slotsShown) highlight = drop;
          else if ((drop.kind === 'later' || drop.kind === 'done') && this.sidesShown) highlight = drop;
        }
      }
    }
    this.sound.setScrapeSpeed(scrape);
    dressing.setHighlight(highlight);

    // Light: on while awake, a short sweep when a session opens, gentle breath.
    const target = this.phase === 'awake' ? 1 : 0;
    this.light += (target - this.light) * (1 - Math.exp(-delta * 4));
    if (this.dipT >= 0) {
      this.dipT += delta;
      if (this.dipT > 0.6) this.dipT = -1;
    }
    const dip = this.dipT >= 0 ? 1 - 0.45 * Math.sin((this.dipT / 0.6) * Math.PI) : 1;
    if (this.sweepT >= 0) {
      this.sweepT += delta;
      const s = this.sweepT / 1.6;
      this.yawTarget = s < 1 ? Math.sin(s * Math.PI * 2) * 0.5 : 0;
      if (s >= 1) {
        this.sweepT = -1;
        this.maybePropose();
      }
    }
    this.yaw += (this.yawTarget - this.yaw) * (1 - Math.exp(-delta * 5));
    const breath = this.phase === 'awake' ? Math.sin(time * 1.3) : 0;
    dressing.setLight(this.light * dip, breath, this.yaw);
    const markers = this.light;
    dressing.setMarkers(this.slotsShown ? markers : 0, this.sidesShown ? markers : 0);

    this.updateCards(delta, time);

    this.world.camera.getWorldPosition(this.eye);
    this.v1.set(POOL_X, 0, POOL_Z);
    lamp.localToWorld(this.v1);
    dressing.update(delta, this.eye, this.v1, this.immersive ? this.light : 0);
  }

  private updateCards(delta: number, time: number): void {
    const follow = 1 - Math.exp(-delta * 22);
    const settle = 1 - Math.exp(-delta * 10);
    for (const entity of this.queries.cards.entities) {
      const rt = this.runtimes.get(entity.getValue(Card, 'cardId') as string);
      if (!rt) continue;
      const held = this.isHeld(rt.id);
      const k = held ? follow : settle;
      rt.x += (rt.tx - rt.x) * k;
      rt.z += (rt.tz - rt.z) * k;
      if (!held) rt.lift += (0 - rt.lift) * settle;
      rt.fade += (rt.fadeTarget - rt.fade) * (1 - Math.exp(-delta * 6));
      rt.visual.root.position.set(rt.x, rt.lift + 0.0003 * (rt.order % 24), rt.z);
      rt.visual.root.visible = rt.fade > 0.01;
      rt.visual.setOpacity(Math.min(1, rt.fade));
      const dist = Math.hypot(rt.x - POOL_X, rt.z - POOL_Z);
      const lit = 1 - smoothstep(POOL_RADIUS * 0.8, POOL_RADIUS * 1.15, dist);
      rt.visual.setBrightness(this.light * lit);
      const pulse = rt.pulse > 0 ? 0.35 + 0.3 * Math.sin(time * 4) : 0;
      rt.visual.setGlow(held ? 0.7 : pulse);
      if (rt.removing && rt.fade < 0.02) {
        this.runtimes.delete(rt.id);
        rt.visual.dispose();
        entity.dispose();
      }
    }
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function smoothstep(a: number, b: number, x: number): number {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Distance from a point to a ray (only forward of the origin). */
function rayPointDistance(origin: Vector3, dir: Vector3, point: Vector3, scratch: Vector3): number {
  scratch.copy(point).sub(origin);
  const t = Math.max(0, scratch.dot(dir));
  scratch.copy(origin).addScaledVector(dir, t);
  return scratch.distanceTo(point);
}
