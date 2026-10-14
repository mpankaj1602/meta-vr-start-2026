import {
  CylinderGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector2,
} from '@iwsdk/core';

/**
 * The Lamplight desk lamp: fixed, faceless, about 30 cm tall.
 *
 * Origin: bottom centre of the base, resting on the desk plane (y = 0).
 * Forward: +Z, toward the seated user. The shade leans forward over the slots.
 *
 * Named parts animated at runtime:
 * - `ShadePivot`: yaw pivot at the top of the stem; turning it points the light.
 * - `Bulb`: emissive bulb inside the shade.
 * - `Chain`: pull chain group hanging from the shade rim; offset in -Y to pull.
 * - `ChainBead`: the bead at the end of the chain, the pinch target.
 * - `ShadeMouth`: an empty marking the centre of the shade opening, for light.
 */

export const LAMP_STEM_HEIGHT = 0.25;
export const LAMP_NECK_REACH = 0.07;
export const LAMP_BASE_RADIUS = 0.055;

const enamel = new MeshStandardMaterial({
  name: 'LampEnamel',
  color: 0x24352f,
  roughness: 0.42,
  metalness: 0.25,
});
const brass = new MeshStandardMaterial({
  name: 'LampBrass',
  color: 0xb08d4f,
  roughness: 0.3,
  metalness: 0.85,
});
const shadeInner = new MeshStandardMaterial({
  name: 'LampShadeInner',
  color: 0xf3e6c8,
  roughness: 0.8,
  metalness: 0,
  emissive: 0xffd9a0,
  emissiveIntensity: 0,
});
const bulbMaterial = new MeshStandardMaterial({
  name: 'LampBulb',
  color: 0xfff4dc,
  roughness: 0.2,
  emissive: 0xffd28a,
  emissiveIntensity: 0.05,
});

function lathe(points: Array<[number, number]>, segments = 48): LatheGeometry {
  return new LatheGeometry(
    points.map(([r, y]) => new Vector2(r, y)),
    segments,
  );
}

function named<T extends Mesh | Group>(object: T, name: string): T {
  object.name = name;
  return object;
}

function buildBase(): Mesh {
  // Weighted, domed base with a rounded lip; a collar socket receives the stem.
  const r = LAMP_BASE_RADIUS;
  const geometry = lathe([
    [0, 0],
    [r - 0.004, 0],
    [r, 0.003],
    [r, 0.008],
    [r - 0.006, 0.014],
    [r * 0.62, 0.019],
    [0.016, 0.022],
    [0.012, 0.03],
    [0, 0.03],
  ]);
  return named(new Mesh(geometry, enamel), 'Base');
}

function buildStem(): Group {
  const stem = named(new Group(), 'Stem');
  const rod = named(
    new Mesh(new CylinderGeometry(0.0055, 0.0065, LAMP_STEM_HEIGHT - 0.03, 20), brass),
    'StemRod',
  );
  rod.position.y = 0.03 + (LAMP_STEM_HEIGHT - 0.03) / 2;
  const collar = named(
    new Mesh(new CylinderGeometry(0.011, 0.013, 0.012, 24), brass),
    'StemCollar',
  );
  collar.position.y = 0.034;
  stem.add(rod, collar);
  return stem;
}

function buildShade(pivot: Group): void {
  // A short neck reaches forward from the pivot; the shade hangs at its tip,
  // leaning toward the user so its mouth faces the slots.
  const knuckle = named(
    new Mesh(new SphereGeometry(0.011, 20, 14), brass),
    'PivotKnuckle',
  );
  const neck = named(
    new Mesh(new CylinderGeometry(0.005, 0.005, LAMP_NECK_REACH, 16), brass),
    'Neck',
  );
  neck.rotation.x = Math.PI / 2;
  neck.position.set(0, 0, LAMP_NECK_REACH / 2);

  const shade = named(new Group(), 'Shade');
  shade.position.set(0, -0.004, LAMP_NECK_REACH);
  shade.rotation.x = 0.14; // a slight lean so the pool lands just in front of the base

  const outer = named(
    new Mesh(
      // Points run bottom to top so the faces point outward.
      lathe([
        [0.051, -0.058],
        [0.05, -0.054],
        [0.046, -0.044],
        [0.03, -0.012],
        [0.016, 0.011],
        [0.008, 0.012],
      ]),
      enamel,
    ),
    'ShadeOuter',
  );
  const inner = named(
    new Mesh(
      // Points run top to bottom so the faces point into the shade.
      lathe([
        [0.0155, 0.008],
        [0.0295, -0.014],
        [0.0455, -0.046],
        [0.0495, -0.0575],
      ]),
      shadeInner,
    ),
    'ShadeInner',
  );
  const rim = named(new Mesh(new TorusGeometry(0.0505, 0.0022, 10, 48), brass), 'ShadeRim');
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.058;
  const bulb = named(new Mesh(new SphereGeometry(0.014, 24, 16), bulbMaterial), 'Bulb');
  bulb.position.y = -0.024;
  const mouth = named(new Group(), 'ShadeMouth');
  mouth.position.y = -0.058;

  // Pull chain: beads hang straight down from the shade's front-right rim.
  const chain = named(new Group(), 'Chain');
  chain.position.set(0.034, -0.05, 0.03);
  const beadGeometry = new SphereGeometry(0.0021, 8, 6);
  for (let i = 0; i < 14; i += 1) {
    const bead = named(new Mesh(beadGeometry, brass), `ChainLink${i}`);
    bead.position.y = -0.005 * i;
    chain.add(bead);
  }
  const pull = named(
    new Mesh(lathe([[0, -0.019], [0.004, -0.018], [0.007, -0.012], [0.006, -0.004], [0, 0]], 20), brass),
    'ChainBead',
  );
  pull.position.y = -0.07;
  chain.add(pull);

  shade.add(outer, inner, rim, bulb, mouth);
  pivot.add(knuckle, neck, shade);
  // The chain hangs plumb, so it lives on the pivot rather than the tilted shade.
  chain.position.applyEuler(shade.rotation).add(shade.position);
  pivot.add(chain);
}

export function createDeskLamp(): Group {
  const root = named(new Group(), 'DeskLamp');
  const pivot = named(new Group(), 'ShadePivot');
  pivot.position.y = LAMP_STEM_HEIGHT;
  buildShade(pivot);
  root.add(buildBase(), buildStem(), pivot);
  return root;
}

export default createDeskLamp();
