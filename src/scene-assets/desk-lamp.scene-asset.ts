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
 * The Duskdesk desk lamp: fixed, faceless, about 30 cm tall, in the classic
 * pull-chain desk-lamp idiom (stepped pedestal base, brass stem, domed shade).
 *
 * Origin: bottom centre of the base, resting on the desk plane (y = 0).
 * Forward: +Z, toward the seated user. The shade leans forward over the slots.
 *
 * Named parts animated at runtime:
 * - `ShadePivot`: yaw pivot at the top of the stem; turning it points the light.
 * - `Bulb`: emissive bulb inside the shade.
 * - `Chain`: pull chain group hanging from the shade rim; its origin is the top
 *   of the chain, so offsetting it in -Y pulls and rotating it swings.
 * - `ChainBead`: the pull at the end of the chain, the pinch target.
 * - `ShadeMouth`: an empty marking the centre of the shade opening, for light.
 */

export const LAMP_STEM_HEIGHT = 0.25;
export const LAMP_NECK_REACH = 0.07;
export const LAMP_BASE_RADIUS = 0.058;
/** Length of the bead chain above the pull, metres. */
export const LAMP_CHAIN_LENGTH = 0.085;

const enamel = new MeshStandardMaterial({
  name: 'LampEnamel',
  color: 0x24352f,
  roughness: 0.38,
  metalness: 0.2,
});
const brass = new MeshStandardMaterial({
  name: 'LampBrass',
  color: 0xb89252,
  roughness: 0.28,
  metalness: 0.88,
});
const darkBrass = new MeshStandardMaterial({
  name: 'LampDarkBrass',
  color: 0x6e5630,
  roughness: 0.5,
  metalness: 0.8,
});
const felt = new MeshStandardMaterial({
  name: 'LampFelt',
  color: 0x1c2a22,
  roughness: 1,
  metalness: 0,
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

function ring(radius: number, tube: number, y: number, material: MeshStandardMaterial, name: string): Mesh {
  const mesh = named(new Mesh(new TorusGeometry(radius, tube, 8, 48), material), name);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

function buildBase(): Group {
  // A stepped pedestal: felt pad, a wide lower step with a rounded lip, a brass
  // trim ring, a domed upper step and a collar socket that receives the stem.
  const base = named(new Group(), 'BaseAssembly');
  const r = LAMP_BASE_RADIUS;
  const pad = named(new Mesh(lathe([[0, 0], [r - 0.003, 0], [r - 0.003, 0.0018], [0, 0.0018]], 40), felt), 'BaseFelt');
  const body = named(
    new Mesh(
      lathe([
        [0, 0.0018],
        [r - 0.002, 0.0018],
        [r, 0.004],
        [r, 0.0095],
        [r - 0.003, 0.0125],
        [r - 0.009, 0.0135],
        [r - 0.012, 0.016],
        [r * 0.66, 0.0215],
        [r * 0.5, 0.026],
        [0.019, 0.029],
        [0.0145, 0.031],
        [0, 0.031],
      ]),
      enamel,
    ),
    'Base',
  );
  const trim = ring(r - 0.0095, 0.0016, 0.0137, brass, 'BaseTrim');
  const socket = named(
    new Mesh(lathe([[0.0155, 0.0295], [0.0155, 0.033], [0.0125, 0.037], [0.0095, 0.0385], [0, 0.0385]], 32), brass),
    'BaseSocket',
  );
  base.add(pad, body, trim, socket);
  return base;
}

function buildStem(): Group {
  // A brass rod with a turned knop halfway up and a flared cap under the knuckle.
  const stem = named(new Group(), 'Stem');
  const bottom = 0.037;
  const top = LAMP_STEM_HEIGHT - 0.009;
  const rod = named(new Mesh(new CylinderGeometry(0.0055, 0.0062, top - bottom, 20), brass), 'StemRod');
  rod.position.y = (top + bottom) / 2;
  const knop = named(
    new Mesh(
      lathe([[0.0062, -0.009], [0.0085, -0.0065], [0.0098, -0.002], [0.0098, 0.002], [0.0085, 0.0065], [0.0058, 0.009]], 28),
      brass,
    ),
    'StemKnop',
  );
  knop.position.y = 0.14;
  const capTop = named(
    new Mesh(lathe([[0.0058, -0.012], [0.0068, -0.006], [0.0088, -0.0015], [0.0092, 0], [0, 0]], 28), brass),
    'StemCap',
  );
  capTop.position.y = LAMP_STEM_HEIGHT - 0.0075;
  stem.add(rod, knop, ring(0.0068, 0.0011, 0.1305, darkBrass, 'StemRingLow'), ring(0.0068, 0.0011, 0.1495, darkBrass, 'StemRingHigh'), capTop);
  return stem;
}

/** One bead-chain profile: round beads joined by thin links, top at y = 0. */
function beadChainGeometry(length: number): LatheGeometry {
  const beadR = 0.0019;
  const link = 0.0006;
  const count = Math.floor(length / 0.0046);
  const pitch = length / count;
  const points: Array<[number, number]> = [[0, -length], [link, -length]];
  for (let i = 0; i < count; i += 1) {
    const yc = -length + (i + 0.5) * pitch;
    for (let k = 0; k <= 6; k += 1) {
      const phi = -Math.PI / 2 + (k / 6) * Math.PI;
      points.push([Math.max(link, beadR * Math.cos(phi)), yc + beadR * Math.sin(phi)]);
    }
  }
  points.push([link, 0], [0, 0]);
  return lathe(points, 10);
}

function buildShade(pivot: Group): void {
  // The knuckle with a thumb screw; a short neck reaches forward to the shade,
  // which hangs at its tip, leaning toward the user over the slots.
  const knuckle = named(new Mesh(new SphereGeometry(0.0115, 20, 14), brass), 'PivotKnuckle');
  const screwShaft = named(new Mesh(new CylinderGeometry(0.0024, 0.0024, 0.012, 12), darkBrass), 'ThumbScrewShaft');
  screwShaft.rotation.z = Math.PI / 2;
  screwShaft.position.x = 0.0145;
  const screwKnob = named(new Mesh(new CylinderGeometry(0.0068, 0.0068, 0.0045, 14), brass), 'ThumbScrewKnob');
  screwKnob.rotation.z = Math.PI / 2;
  screwKnob.position.x = 0.022;
  const neck = named(new Mesh(new CylinderGeometry(0.0045, 0.0045, LAMP_NECK_REACH, 16), brass), 'Neck');
  neck.rotation.x = Math.PI / 2;
  neck.position.set(0, 0, LAMP_NECK_REACH / 2);

  const shade = named(new Group(), 'Shade');
  shade.position.set(0, -0.004, LAMP_NECK_REACH);
  shade.rotation.x = 0.14; // a slight lean so the pool lands just in front of the base

  // Points run bottom to top so the faces point outward.
  const outer = named(
    new Mesh(
      lathe([
        [0.052, -0.058],
        [0.0515, -0.0545],
        [0.0475, -0.044],
        [0.039, -0.03],
        [0.03, -0.014],
        [0.021, 0.002],
        [0.0135, 0.0105],
        [0.0085, 0.013],
      ]),
      enamel,
    ),
    'ShadeOuter',
  );
  // Points run top to bottom so the faces point into the shade.
  const inner = named(
    new Mesh(
      lathe([
        [0.012, 0.009],
        [0.0285, -0.0135],
        [0.0375, -0.028],
        [0.0465, -0.0455],
        [0.0505, -0.0575],
      ]),
      shadeInner,
    ),
    'ShadeInner',
  );
  const rim = ring(0.0512, 0.0028, -0.058, brass, 'ShadeRim');
  const cap = named(
    new Mesh(lathe([[0.0128, 0.0092], [0.0124, 0.0125], [0.0095, 0.0165], [0.0045, 0.0186], [0, 0.019]], 32), brass),
    'ShadeCap',
  );
  const finial = named(new Mesh(new SphereGeometry(0.0036, 14, 10), brass), 'ShadeFinial');
  finial.position.y = 0.0215;
  const socket = named(new Mesh(new CylinderGeometry(0.009, 0.0096, 0.022, 20), brass), 'BulbSocket');
  socket.position.y = -0.003;
  const bulb = named(new Mesh(new SphereGeometry(0.0145, 24, 16), bulbMaterial), 'Bulb');
  bulb.scale.y = 1.2;
  bulb.position.y = -0.03;
  const mouth = named(new Group(), 'ShadeMouth');
  mouth.position.y = -0.058;

  // Pull chain: a bead chain falls from the switch inside the shade, past the
  // front-right rim, ending in a weighted brass pull.
  const chain = named(new Group(), 'Chain');
  chain.position.set(0.034, -0.05, 0.03);
  const beads = named(new Mesh(beadChainGeometry(LAMP_CHAIN_LENGTH), brass), 'ChainBeads');
  const pull = named(
    new Mesh(
      lathe(
        [[0, -0.026], [0.0036, -0.0255], [0.0063, -0.0215], [0.007, -0.0155], [0.0057, -0.0085], [0.003, -0.004], [0.0017, -0.0016], [0.0017, 0], [0, 0]],
        20,
      ),
      brass,
    ),
    'ChainBead',
  );
  pull.position.y = -LAMP_CHAIN_LENGTH - 0.0004;
  chain.add(beads, pull);

  shade.add(outer, inner, rim, cap, finial, socket, bulb, mouth);
  pivot.add(knuckle, screwShaft, screwKnob, neck, shade);
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

/** Shade outlines per lamp style. The mouth stays at y = -0.058 so the light lands the same. */
export interface ShadeProfile {
  outer: LatheGeometry;
  inner: LatheGeometry;
  rimRadius: number;
}

const SHADE_POINTS: Record<'classic' | 'modern' | 'studio', { outer: Array<[number, number]>; inner: Array<[number, number]>; rimRadius: number }> = {
  classic: {
    outer: [[0.052, -0.058], [0.0515, -0.0545], [0.0475, -0.044], [0.039, -0.03], [0.03, -0.014], [0.021, 0.002], [0.0135, 0.0105], [0.0085, 0.013]],
    inner: [[0.012, 0.009], [0.0285, -0.0135], [0.0375, -0.028], [0.0465, -0.0455], [0.0505, -0.0575]],
    rimRadius: 0.0512,
  },
  // A wide, shallow dome.
  modern: {
    outer: [[0.058, -0.058], [0.0575, -0.0545], [0.054, -0.046], [0.047, -0.035], [0.037, -0.024], [0.025, -0.013], [0.015, -0.002], [0.0098, 0.006], [0.0085, 0.0095]],
    inner: [[0.0115, 0.003], [0.023, -0.0125], [0.035, -0.0235], [0.0455, -0.035], [0.052, -0.046], [0.0565, -0.0575]],
    rimRadius: 0.0572,
  },
  // A straight-sided drum, like a studio spotlight.
  studio: {
    outer: [[0.046, -0.058], [0.0458, -0.0545], [0.0448, -0.03], [0.0435, -0.012], [0.0405, -0.002], [0.032, 0.007], [0.018, 0.0118], [0.0085, 0.013]],
    inner: [[0.012, 0.0095], [0.03, 0.0045], [0.0395, -0.004], [0.0418, -0.015], [0.0428, -0.035], [0.0442, -0.0575]],
    rimRadius: 0.0458,
  },
};

const shadeCache = new Map<string, ShadeProfile>();

export function shadeProfile(style: 'classic' | 'modern' | 'studio'): ShadeProfile {
  let profile = shadeCache.get(style);
  if (!profile) {
    const p = SHADE_POINTS[style];
    profile = { outer: lathe(p.outer), inner: lathe(p.inner), rimRadius: p.rimRadius };
    shadeCache.set(style, profile);
  }
  return profile;
}
