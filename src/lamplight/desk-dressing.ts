import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  SpotLight,
  TorusGeometry,
  Vector2,
  Vector3,
} from '@iwsdk/core';
import type { Entity, World } from '@iwsdk/core';
import {
  BIN_HEIGHT,
  BIN_RADIUS,
  BIN_Z,
  CARD_DEPTH,
  EXIT_Z,
  binX,
  exitX,
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
import type { LampStyle, SavedCard } from './store.js';
import { shadeProfile } from '../scene-assets/desk-lamp.scene-asset.js';

type Finish = { color: number; roughness: number; metalness: number };
/** Body (enamel), metal fittings, dark fittings and the felt pad, per style. */
const STYLE_FINISH: Record<LampStyle, { body: Finish; metal: Finish; dark: Finish; felt: Finish }> = {
  classic: {
    body: { color: 0x24352f, roughness: 0.38, metalness: 0.2 },
    metal: { color: 0xb89252, roughness: 0.28, metalness: 0.88 },
    dark: { color: 0x6e5630, roughness: 0.5, metalness: 0.8 },
    felt: { color: 0x1c2a22, roughness: 1, metalness: 0 },
  },
  modern: {
    body: { color: 0xe8e2d6, roughness: 0.62, metalness: 0 },
    metal: { color: 0x1e1e20, roughness: 0.42, metalness: 0.35 },
    dark: { color: 0x3a3a3d, roughness: 0.5, metalness: 0.3 },
    felt: { color: 0x2a2a2a, roughness: 1, metalness: 0 },
  },
  studio: {
    body: { color: 0x9da3a8, roughness: 0.33, metalness: 0.85 },
    metal: { color: 0xb8743a, roughness: 0.3, metalness: 0.9 },
    dark: { color: 0x1f1f21, roughness: 0.45, metalness: 0.5 },
    felt: { color: 0x202020, roughness: 1, metalness: 0 },
  },
};
type Role = 'body' | 'metal' | 'dark' | 'felt';
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
  private readonly folder: Group;
  private readonly folderFlap: Object3D;
  private readonly bin: Group;
  private readonly exitPlane: TextPlane;
  private readonly historyTitle: TextPlane;
  private readonly beadMaterial: MeshStandardMaterial;
  private folderOpen = 0;
  private folderOpenTarget = 0;
  private binKickT = -1;
  private stampLandY = 0.0015;
  private readonly roleMeshes: Record<Role, Mesh[]> = { body: [], metal: [], dark: [], felt: [] };
  private readonly styleMaterials = new Map<string, MeshStandardMaterial>();
  private readonly shadeOuter: Mesh;
  private readonly shadeInner: Mesh;
  private readonly shadeRim: Object3D;
  private readonly grabRing: Mesh;
  private readonly grabMaterial = new MeshBasicMaterial({
    color: 0xffc76b,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  });
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

    // Sort the lamp's parts by finish before any material is cloned below.
    const roleOf: Record<string, Role> = { LampEnamel: 'body', LampBrass: 'metal', LampDarkBrass: 'dark', LampFelt: 'felt' };
    this.lampObject.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh || mesh.name === 'ChainBead') return;
      const role = roleOf[(mesh.material as MeshStandardMaterial).name];
      if (role) this.roleMeshes[role].push(mesh);
    });
    this.shadeOuter = this.require('ShadeOuter') as Mesh;
    this.shadeInner = this.require('ShadeInner') as Mesh;
    this.shadeRim = this.require('ShadeRim');

    // This instance owns its lit materials so other placements stay unlit.
    const bulb = this.require('Bulb') as Mesh;
    this.bulbMaterial = (bulb.material as MeshStandardMaterial).clone();
    bulb.material = this.bulbMaterial;
    const bead = this.chainBead as Mesh;
    this.beadMaterial = (bead.material as MeshStandardMaterial).clone();
    this.beadMaterial.emissive.setHex(0xffc76b);
    this.beadMaterial.emissiveIntensity = 0;
    bead.material = this.beadMaterial;
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
    this.folder = this.buildFolder();
    this.folderFlap = this.folder.getObjectByName('FolderFlap')!;
    add(this.folder);
    this.bin = this.buildBin();
    add(this.bin);

    // A warm ring around the base edge: "hold the lamp here", like a window's grab bar.
    this.grabRing = new Mesh(new TorusGeometry(0.063, 0.0022, 8, 64), this.grabMaterial);
    this.grabRing.name = 'GrabRing';
    this.grabRing.rotation.x = Math.PI / 2;
    this.grabRing.position.y = 0.007;
    this.grabRing.visible = false;
    add(this.grabRing);

    this.exitPlane = new TextPlane('ExitButton', 0.075, 0.03, 4000);
    this.exitPlane.mesh.rotation.x = -0.9;
    this.exitPlane.mesh.renderOrder = 30;
    this.drawExit(false);
    add(this.exitPlane.mesh);

    this.historyTitle = new TextPlane('HistoryTitle', 0.26, 0.034, 4000);
    this.historyTitle.mesh.renderOrder = 30;
    this.historyTitle.mesh.visible = false;
    add(this.historyTitle.mesh);
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

  /** A manila folder lying flat, open toward the user; done cards slip in. */
  private buildFolder(): Group {
    const folder = new Group();
    folder.name = 'DoneFolder';
    const manila = new MeshStandardMaterial({ color: 0xcfa45f, roughness: 0.85 });
    const flapMaterial = new MeshStandardMaterial({ color: 0xdcb77a, roughness: 0.85 });
    const back = new Mesh(new BoxGeometry(0.078, 0.0016, 0.058), manila);
    back.position.y = 0.0008;
    const tab = new Mesh(new BoxGeometry(0.026, 0.0016, 0.01), manila);
    tab.position.set(-0.02, 0.0008, -0.033);
    const flap = new Group();
    flap.name = 'FolderFlap';
    flap.position.set(0, 0.0018, -0.029);
    const cover = new Mesh(new BoxGeometry(0.078, 0.0014, 0.052), flapMaterial);
    cover.position.z = 0.026;
    flap.add(cover);
    folder.add(back, tab, flap);
    folder.visible = false;
    return folder;
  }

  /** A small open waste bin for let-go cards. */
  private buildBin(): Group {
    const bin = new Group();
    bin.name = 'Bin';
    const metal = new MeshStandardMaterial({
      color: 0x34363a,
      roughness: 0.5,
      metalness: 0.55,
      side: DoubleSide,
    });
    const r = BIN_RADIUS;
    const body = new Mesh(
      new LatheGeometry(
        [
          new Vector2(0, 0.002),
          new Vector2(r * 0.74, 0.002),
          new Vector2(r * 0.76, 0),
          new Vector2(r, BIN_HEIGHT),
        ],
        40,
      ),
      metal,
    );
    const rim = new Mesh(new TorusGeometry(r, 0.0019, 8, 40), metal);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = BIN_HEIGHT;
    const band = new Mesh(new TorusGeometry(r * 0.83, 0.0012, 6, 40), metal);
    band.rotation.x = Math.PI / 2;
    band.position.y = BIN_HEIGHT * 0.3;
    bin.add(body, rim, band);
    bin.visible = false;
    return bin;
  }

  private drawExit(pressed: boolean): void {
    const { ctx, width, height } = this.exitPlane;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = pressed ? '#fff4dc' : 'rgba(12,11,10,0.9)';
    roundRect(ctx, 6, 6, width - 12, height - 12, (height - 12) / 2);
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#fff4dc';
    ctx.stroke();
    ctx.fillStyle = pressed ? '#15130f' : '#fff4dc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(height * 0.5)}px ${FONT}`;
    ctx.fillText('Exit', width / 2, height / 2 + 3);
    this.exitPlane.commit();
  }

  setExitPressed(pressed: boolean): void {
    this.drawExit(pressed);
  }

  setExitVisible(visible: boolean): void {
    this.exitPlane.mesh.visible = visible;
  }

  /** Folder and bin appear once the side trays are in play. */
  setSidesVisible(visible: boolean): void {
    this.folder.visible = visible;
    this.bin.visible = visible;
  }

  /** Open the folder's flap a little more, e.g. while a card hovers over it. */
  setFolderOpen(open: boolean): void {
    this.folderOpenTarget = open ? 1 : 0;
  }

  /** A small hop of the bin when a ball lands in it. */
  kickBin(): void {
    this.binKickT = 0;
  }

  /** World-free lamp-local centres of the folder and bin, for picking and animation. */
  folderCentre(out: Vector3): Vector3 {
    return out.copy(this.folder.position);
  }

  binCentre(out: Vector3): Vector3 {
    return out.copy(this.bin.position);
  }

  exitCentre(out: Vector3): Vector3 {
    return out.copy(this.exitPlane.mesh.position);
  }

  /** Show the base's grab ring: 0 hidden, 1 fully lit (while held). */
  setGrabGlow(amount: number): void {
    this.grabMaterial.opacity = amount;
    this.grabRing.visible = amount > 0.01;
  }

  /** Glow on the chain's pull when a hand comes near: 0..1. */
  setChainGlow(amount: number): void {
    this.beadMaterial.emissiveIntensity = 0.9 * amount;
  }

  showHistoryTitle(text: string, x: number, y: number, z: number): void {
    drawPill(this.historyTitle, text);
    this.historyTitle.mesh.position.set(x, y, z);
    this.historyTitle.mesh.visible = text.length > 0;
  }

  /** Restyle this lamp: finishes and shade outline. Light and behaviour are unchanged. */
  setStyle(style: LampStyle): void {
    const finish = STYLE_FINISH[style];
    for (const role of ['body', 'metal', 'dark', 'felt'] as const) {
      const key = `${style}:${role}`;
      let material = this.styleMaterials.get(key);
      if (!material) {
        const f = finish[role];
        material = new MeshStandardMaterial({ name: `Lamp_${key}`, color: f.color, roughness: f.roughness, metalness: f.metalness });
        this.styleMaterials.set(key, material);
      }
      for (const mesh of this.roleMeshes[role]) mesh.material = material;
    }
    this.beadMaterial.color.setHex(finish.metal.color);
    this.beadMaterial.roughness = finish.metal.roughness;
    this.beadMaterial.metalness = finish.metal.metalness;
    const profile = shadeProfile(style);
    this.shadeOuter.geometry = profile.outer;
    this.shadeInner.geometry = profile.inner;
    this.shadeRim.scale.setScalar(profile.rimRadius / 0.0512);
  }

  setMirrored(mirrored: boolean): void {
    this.laterPlane.mesh.position.set(laterX(mirrored), 0.0006, TRAY_Z);
    this.donePlane.mesh.position.set(doneX(mirrored), 0.0006, TRAY_Z);
    this.folder.position.set(doneX(mirrored), 0.0007, TRAY_Z - 0.003);
    this.bin.position.set(binX(mirrored), 0, BIN_Z);
    this.exitPlane.mesh.position.set(exitX(mirrored), 0.016, EXIT_Z);
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
    this.drawTray(this.donePlane, 'done', '', this.highlight?.kind === 'done');
    this.setFolderOpen(this.highlight?.kind === 'done');
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
    if (glyph) {
      ctx.font = `800 ${Math.round(height * 0.3)}px ${FONT}`;
      ctx.fillText(glyph, width / 2, height * 0.36);
      ctx.font = `700 ${Math.round(height * 0.22)}px ${FONT}`;
      ctx.fillText(label, width / 2, height * 0.72);
    } else {
      // The folder covers the middle; the label sits along the near edge.
      ctx.font = `700 ${Math.round(height * 0.17)}px ${FONT}`;
      ctx.fillText(label, width / 2, height * 0.92);
    }
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
  dropStamp(x: number, z: number, land: () => void, landY = 0.0015): void {
    this.stampLandY = landY;
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
        this.stamp.position.y = (0.09 - this.stampLandY) * (1 - (t / 0.22) ** 2) + this.stampLandY;
      } else {
        if (this.onStampLand) {
          this.onStampLand();
          this.onStampLand = null;
        }
        this.stamp.position.y = this.stampLandY + Math.max(0, t - 0.45) * 0.4;
        if (t > 0.75) {
          this.stamp.visible = false;
          this.stampT = -1;
        }
      }
    }
    this.folderOpen += (this.folderOpenTarget - this.folderOpen) * (1 - Math.exp(-delta * 10));
    this.folderFlap.rotation.x = -(0.1 + 0.28 * this.folderOpen);
    if (this.binKickT >= 0) {
      this.binKickT += delta;
      const k = this.binKickT / 0.35;
      this.bin.scale.setScalar(1 + 0.08 * Math.sin(Math.min(1, k) * Math.PI) * (1 - k));
      if (k >= 1) {
        this.binKickT = -1;
        this.bin.scale.setScalar(1);
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
    this.exitPlane.dispose();
    this.historyTitle.dispose();
    for (const material of this.styleMaterials.values()) material.dispose();
    this.grabMaterial.dispose();
    for (const plane of [...this.slotPlanes, this.laterPlane, this.donePlane]) plane.dispose();
  }
}
