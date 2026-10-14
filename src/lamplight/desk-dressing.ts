import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SpotLight,
  Vector3,
} from '@iwsdk/core';
import type { Entity, World } from '@iwsdk/core';
import {
  CARD_DEPTH,
  CARD_WIDTH,
  POOL_RADIUS,
  POOL_X,
  POOL_Z,
  SLOT_COUNT,
  SLOT_Z,
  TRAY_DEPTH,
  TRAY_WIDTH,
  TRAY_Z,
  doneX,
  laterX,
  slotX,
} from './layout.js';
import type { SavedCard } from './store.js';
import { FONT, GhostPinch, RoomDimmer, TextPlane, createLightPool, drawPill, roundRect } from './visuals.js';
import { wordCount } from './rules.js';

export type ZoneHighlight = { kind: 'slot'; index: number } | { kind: 'later' } | { kind: 'done' } | null;

/**
 * Everything the lamp draws on the desk besides cards: its light, the slot
 * outlines, the later tray and done pad, the caption strip, the "tomorrow"
 * preview, the stamp, the floating tray and the ghost demonstration. All of
 * it lives in the lamp's local frame, so it moves when the lamp is re-placed.
 */
export class DeskDressing {
  readonly lampObject: Object3D;
  readonly shadePivot: Object3D;
  readonly chain: Object3D;
  readonly chainBead: Object3D;
  readonly ghost = new GhostPinch();
  readonly dimmer = new RoomDimmer();

  private readonly bulbMaterial: MeshStandardMaterial;
  private readonly innerMaterial: MeshStandardMaterial;
  private readonly spot: SpotLight;
  private readonly spotTarget = new Object3D();
  private readonly pool = createLightPool(POOL_RADIUS * 1.15);
  private readonly slotPlanes: TextPlane[] = [];
  private readonly laterPlane: TextPlane;
  private readonly donePlane: TextPlane;
  private readonly caption: TextPlane;
  private readonly preview: TextPlane;
  private readonly tray: Mesh;
  private readonly stamp: Group;
  private readonly entities: Entity[] = [];
  private highlight: ZoneHighlight = null;
  private captionTimer = 0;
  private stampT = -1;
  private onStampLand: (() => void) | null = null;

  constructor(world: World, lamp: Entity) {
    this.lampObject = lamp.object3D!;
    this.shadePivot = this.require('ShadePivot');
    this.chain = this.require('Chain');
    this.chainBead = this.require('ChainBead');

    // This instance owns its lit materials so other placements stay unlit.
    const bulb = this.require('Bulb') as Mesh;
    this.bulbMaterial = (bulb.material as MeshStandardMaterial).clone();
    bulb.material = this.bulbMaterial;
    const inner = this.require('ShadeInner') as Mesh;
    this.innerMaterial = (inner.material as MeshStandardMaterial).clone();
    inner.material = this.innerMaterial;

    this.spot = new SpotLight(0xffd6a0, 0, 1.2, 0.85, 0.6, 1.6);
    this.spot.name = 'LampLight';
    this.require('ShadeMouth').add(this.spot);
    this.spotTarget.position.set(POOL_X, 0, POOL_Z);
    this.spot.target = this.spotTarget;
    this.lampObject.add(this.spotTarget);

    const add = (object: Object3D, parent: Entity | undefined = lamp) => {
      this.entities.push(world.createTransformEntity(object, parent ? { parent } : undefined));
    };

    this.pool.mesh.position.set(POOL_X, 0.0004, POOL_Z);
    add(this.pool.mesh);

    for (let i = 0; i < SLOT_COUNT; i += 1) {
      const plane = new TextPlane(`Slot${i + 1}`, CARD_WIDTH + 0.006, CARD_DEPTH + 0.008, 4000);
      plane.mesh.rotation.x = -Math.PI / 2;
      plane.mesh.position.set(slotX(i), 0.0006, SLOT_Z);
      this.slotPlanes.push(plane);
      add(plane.mesh);
    }
    this.laterPlane = new TextPlane('LaterTray', TRAY_WIDTH, TRAY_DEPTH, 4000);
    this.donePlane = new TextPlane('DonePad', TRAY_WIDTH, TRAY_DEPTH, 4000);
    for (const plane of [this.laterPlane, this.donePlane]) {
      plane.mesh.rotation.x = -Math.PI / 2;
      add(plane.mesh);
    }

    this.caption = new TextPlane('Caption', 0.3, 0.036, 4000);
    this.caption.mesh.position.set(0, 0.03, 0.315);
    this.caption.mesh.rotation.x = -0.6;
    this.caption.mesh.renderOrder = 30;
    add(this.caption.mesh);

    this.preview = new TextPlane('TomorrowPreview', 0.2, 0.125, 4000);
    this.preview.mesh.position.set(0, 0.105, 0.135);
    this.preview.mesh.rotation.x = -0.45;
    this.preview.mesh.visible = false;
    add(this.preview.mesh);

    this.tray = new Mesh(
      new BoxGeometry(0.47, 0.012, 0.32),
      new MeshStandardMaterial({ color: 0x3a2e24, roughness: 0.7 }),
    );
    this.tray.name = 'FloatingTray';
    this.tray.position.set(0, -0.0062, 0.1);
    add(this.tray);

    this.stamp = this.buildStamp();
    add(this.stamp);
    add(this.ghost.root);
    add(this.dimmer.mesh, undefined);

    this.setMirrored(false);
    this.drawMarkers();
  }

  private require(name: string): Object3D {
    const found = this.lampObject.getObjectByName(name);
    if (!found) throw new Error(`Desk lamp is missing its "${name}" part`);
    return found;
  }

  private buildStamp(): Group {
    const stamp = new Group();
    stamp.name = 'Stamp';
    const wood = new MeshStandardMaterial({ color: 0x6b4a2e, roughness: 0.6 });
    const rubber = new MeshStandardMaterial({ color: 0x7a1f12, roughness: 0.9 });
    const foot = new Mesh(new BoxGeometry(0.05, 0.008, 0.03), rubber);
    foot.position.y = 0.004;
    const block = new Mesh(new BoxGeometry(0.054, 0.014, 0.034), wood);
    block.position.y = 0.015;
    const handle = new Mesh(new CylinderGeometry(0.007, 0.009, 0.035, 16), wood);
    handle.position.y = 0.04;
    const knob = new Mesh(new CylinderGeometry(0.012, 0.012, 0.01, 20), wood);
    knob.position.y = 0.06;
    stamp.add(foot, block, handle, knob);
    stamp.visible = false;
    return stamp;
  }

  setMirrored(mirrored: boolean): void {
    this.laterPlane.mesh.position.set(laterX(mirrored), 0.0006, TRAY_Z);
    this.donePlane.mesh.position.set(doneX(mirrored), 0.0006, TRAY_Z);
  }

  /** Where the done pad and later tray sit, for snapping cards. */
  doneCentre(mirrored: boolean, out: { x: number; z: number }): void {
    out.x = doneX(mirrored);
    out.z = TRAY_Z;
  }

  setTrayVisible(visible: boolean): void {
    this.tray.visible = visible;
  }

  /** Light level 0..1, a gentle breath and the shade's yaw toward a point. */
  setLight(level: number, breath: number, yaw: number): void {
    this.shadePivot.rotation.y = yaw;
    this.bulbMaterial.emissiveIntensity = 0.05 + 2.4 * level;
    this.innerMaterial.emissiveIntensity = 0.55 * level;
    this.spot.intensity = 2.2 * level * (1 + 0.06 * breath);
    const shift = Math.sin(yaw) * 0.05;
    this.spotTarget.position.set(POOL_X + shift, 0, POOL_Z);
    this.pool.mesh.position.set(POOL_X + shift, 0.0004, POOL_Z);
    this.pool.material.uniforms.uIntensity!.value = level;
    this.pool.material.uniforms.uBreath!.value = breath;
    this.pool.mesh.visible = level > 0.002;
  }

  /** Fade the slot outlines, later tray and done pad. */
  setMarkers(slots: number, sides: number): void {
    for (const plane of this.slotPlanes) {
      plane.material.opacity = slots;
      plane.mesh.visible = slots > 0.01;
    }
    for (const plane of [this.laterPlane, this.donePlane]) {
      plane.material.opacity = sides;
      plane.mesh.visible = sides > 0.01;
    }
  }

  setHighlight(highlight: ZoneHighlight): void {
    const same =
      highlight?.kind === this.highlight?.kind &&
      (highlight?.kind !== 'slot' || (this.highlight?.kind === 'slot' && this.highlight.index === highlight.index));
    if (same) return;
    this.highlight = highlight;
    this.drawMarkers();
  }

  private drawMarkers(): void {
    this.slotPlanes.forEach((plane, i) => {
      const on = this.highlight?.kind === 'slot' && this.highlight.index === i;
      const { ctx, width, height } = plane;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = on ? 'rgba(255,214,150,0.35)' : 'rgba(255,240,215,0.1)';
      roundRect(ctx, 8, 8, width - 16, height - 16, 22);
      ctx.fill();
      ctx.setLineDash(on ? [] : [26, 14]);
      ctx.lineWidth = on ? 14 : 8;
      ctx.strokeStyle = '#fff4dc';
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff4dc';
      ctx.font = `800 ${Math.round(height * 0.42)}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), width / 2, height / 2 + 6);
      plane.commit();
    });
    this.drawTray(this.laterPlane, 'later', '↻', this.highlight?.kind === 'later');
    this.drawTray(this.donePlane, 'done', '✓', this.highlight?.kind === 'done');
  }

  private drawTray(plane: TextPlane, label: string, glyph: string, on: boolean): void {
    const { ctx, width, height } = plane;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = on ? 'rgba(255,214,150,0.4)' : 'rgba(20,17,14,0.55)';
    roundRect(ctx, 8, 8, width - 16, height - 16, 26);
    ctx.fill();
    ctx.lineWidth = on ? 14 : 8;
    ctx.strokeStyle = '#fff4dc';
    ctx.stroke();
    ctx.fillStyle = '#fff4dc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(height * 0.3)}px ${FONT}`;
    ctx.fillText(glyph, width / 2, height * 0.36);
    ctx.font = `700 ${Math.round(height * 0.22)}px ${FONT}`;
    ctx.fillText(label, width / 2, height * 0.72);
    plane.commit();
  }

  /** Show a caption of six words or fewer; seconds = 0 keeps it up. */
  say(text: string, seconds = 4): void {
    if (wordCount(text) > 6) console.warn(`[lamplight] caption over six words: "${text}"`);
    drawPill(this.caption, text);
    this.caption.mesh.visible = text.length > 0;
    this.captionTimer = seconds;
  }

  showPreview(cards: readonly SavedCard[]): void {
    const { ctx, width, height } = this.preview;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(12,11,10,0.88)';
    roundRect(ctx, 6, 6, width - 12, height - 12, 40);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#fff4dc';
    ctx.stroke();
    ctx.fillStyle = '#fff4dc';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `800 64px ${FONT}`;
    ctx.fillText('tomorrow', 48, 70);
    const rowH = (height - 150) / 3;
    for (let i = 0; i < 3; i += 1) {
      const y = 130 + i * rowH;
      const card = cards[i];
      ctx.fillStyle = card ? '#f7f0e1' : 'rgba(255,244,220,0.18)';
      roundRect(ctx, 40, y, width - 80, rowH - 18, 18);
      ctx.fill();
      ctx.fillStyle = card ? '#1b1813' : '#fff4dc';
      ctx.font = `700 52px ${FONT}`;
      let text = card ? card.text : '—';
      while (ctx.measureText(`${i + 1}  ${text}`).width > width - 130 && text.length > 4) {
        text = `${text.slice(0, -2).trimEnd()}…`;
      }
      ctx.fillText(`${i + 1}  ${text}`, 72, y + (rowH - 18) / 2 + 2);
    }
    this.preview.commit();
    this.preview.mesh.visible = true;
  }

  hidePreview(): void {
    this.preview.mesh.visible = false;
  }

  /** Drop the stamp on the done pad; `land` runs at the moment of impact. */
  dropStamp(x: number, z: number, land: () => void): void {
    this.stamp.position.set(x, 0.09, z);
    this.stamp.visible = true;
    this.stampT = 0;
    this.onStampLand = land;
  }

  update(delta: number, eye: Vector3, poolWorld: Vector3, dimLevel: number): void {
    if (this.captionTimer > 0) {
      this.captionTimer -= delta;
      if (this.captionTimer <= 0) this.say('', 0);
    }
    if (this.stampT >= 0) {
      this.stampT += delta;
      const t = this.stampT;
      if (t < 0.22) {
        this.stamp.position.y = 0.09 * (1 - (t / 0.22) ** 2) + 0.0015;
      } else {
        if (this.onStampLand) {
          this.onStampLand();
          this.onStampLand = null;
        }
        this.stamp.position.y = 0.0015 + Math.max(0, t - 0.45) * 0.4;
        if (t > 0.75) {
          this.stamp.visible = false;
          this.stampT = -1;
        }
      }
    }
    this.ghost.update(delta);
    // The dimming shell follows the eye and leaves the pool of light clear.
    this.dimmer.mesh.position.copy(eye);
    const dist = Math.max(0.05, poolWorld.distanceTo(eye));
    poolWorld.sub(eye).normalize();
    this.dimmer.update(dimLevel, poolWorld, Math.atan((POOL_RADIUS * 1.15) / dist));
  }

  dispose(): void {
    for (const entity of this.entities) entity.dispose();
    this.caption.dispose();
    this.preview.dispose();
    for (const plane of [...this.slotPlanes, this.laterPlane, this.donePlane]) plane.dispose();
  }
}
