/**
 * Desk layout in the lamp's local frame (metres). The desk plane is y = 0,
 * the lamp base sits at the origin and +Z points toward the seated user.
 * Everything fits a 40 x 25 cm airplane tray table.
 */

export const CARD_WIDTH = 0.075;
export const CARD_DEPTH = 0.05;
export const CARD_THICKNESS = 0.0012;

/** Centre of the pool of light on the desk. */
export const POOL_X = 0;
export const POOL_Z = 0.1;
/** Radius of the lit pool; a card released beyond LET_GO_RADIUS is let go. */
export const POOL_RADIUS = 0.2;
export const LET_GO_RADIUS = 0.235;

export const SLOT_COUNT = 3;
export const SLOT_Z = 0.088;
export const SLOT_SPACING = 0.084;

/** Side trays. `side` is -1 for the user's left; a mirrored layout flips it. */
export const TRAY_X = 0.165;
export const TRAY_Z = 0.088;
export const TRAY_WIDTH = 0.082;
export const TRAY_DEPTH = 0.07;

/** The bin for let-go cards sits behind the lamp on the done side. */
export const BIN_X = 0.13;
export const BIN_Z = -0.035;
export const BIN_RADIUS = 0.032;
export const BIN_HEIGHT = 0.058;

/** The exit button sits behind the lamp on the other side. */
export const EXIT_X = 0.1;
export const EXIT_Z = -0.025;

/** Row where loose cards fan out, nearest the user. */
export const FAN_Z = 0.165;

/** How close (in the desk plane) a released card must be to snap. */
export const SNAP_RADIUS = 0.045;

/** Floating-tray tilt toward the user when no real surface is found. */
export const FLOAT_TILT_RAD = 0.35;

export function slotX(index: number): number {
  return (index - (SLOT_COUNT - 1) / 2) * SLOT_SPACING;
}

export function laterX(mirrored: boolean): number {
  return mirrored ? TRAY_X : -TRAY_X;
}

export function doneX(mirrored: boolean): number {
  return mirrored ? -TRAY_X : TRAY_X;
}

export function binX(mirrored: boolean): number {
  return mirrored ? -BIN_X : BIN_X;
}

export function exitX(mirrored: boolean): number {
  return mirrored ? EXIT_X : -EXIT_X;
}

export type DropTarget =
  | { kind: 'slot'; index: number }
  | { kind: 'later' }
  | { kind: 'done' }
  | { kind: 'letGo' }
  | { kind: 'loose' };

/** Classify where a card released at desk point (x, z) belongs. */
export function classifyDrop(x: number, z: number, mirrored: boolean): DropTarget {
  const dx = x - POOL_X;
  const dz = z - POOL_Z;
  if (dx * dx + dz * dz > LET_GO_RADIUS * LET_GO_RADIUS) {
    return { kind: 'letGo' };
  }
  if (Math.hypot(x - binX(mirrored), z - BIN_Z) < BIN_RADIUS + 0.012) {
    return { kind: 'letGo' };
  }
  for (let i = 0; i < SLOT_COUNT; i += 1) {
    if (Math.abs(x - slotX(i)) < SNAP_RADIUS && Math.abs(z - SLOT_Z) < SNAP_RADIUS * 0.8) {
      return { kind: 'slot', index: i };
    }
  }
  if (Math.abs(x - laterX(mirrored)) < TRAY_WIDTH / 2 + 0.01 && Math.abs(z - TRAY_Z) < TRAY_DEPTH / 2 + 0.01) {
    return { kind: 'later' };
  }
  if (Math.abs(x - doneX(mirrored)) < TRAY_WIDTH / 2 + 0.01 && Math.abs(z - TRAY_Z) < TRAY_DEPTH / 2 + 0.01) {
    return { kind: 'done' };
  }
  return { kind: 'loose' };
}

/** Clamp a dragged point to a disc slightly beyond the let-go edge. */
export function clampToDesk(point: { x: number; z: number }): void {
  const dx = point.x - POOL_X;
  const dz = point.z - POOL_Z;
  const max = LET_GO_RADIUS + 0.06;
  const d = Math.hypot(dx, dz);
  if (d > max) {
    point.x = POOL_X + (dx / d) * max;
    point.z = POOL_Z + (dz / d) * max;
  }
}

/** Fan position for the i-th of n loose cards (two rows if needed). */
export function fanPosition(i: number, n: number, out: { x: number; z: number }): void {
  const perRow = 4;
  const row = Math.floor(i / perRow);
  const inRow = Math.min(perRow, n - row * perRow);
  const col = i % perRow;
  out.x = (col - (inRow - 1) / 2) * (CARD_WIDTH + 0.008);
  out.z = FAN_Z + row * (CARD_DEPTH + 0.008) - 0.004 * Math.abs(col - (inRow - 1) / 2);
}
