import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
} from '@iwsdk/core';

export const FONT = '"Atkinson Hyperlegible", "Segoe UI", system-ui, sans-serif';

/** A flat plane whose face is a canvas you draw on. */
export class TextPlane {
  readonly mesh: Mesh;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  private readonly texture: CanvasTexture;
  readonly material: MeshBasicMaterial;

  constructor(name: string, width: number, height: number, pxPerMetre = 5000) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.round(width * pxPerMetre);
    this.canvas.height = Math.round(height * pxPerMetre);
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new CanvasTexture(this.canvas);
    this.texture.colorSpace = SRGBColorSpace;
    this.texture.anisotropy = 4;
    this.material = new MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    this.mesh = new Mesh(new PlaneGeometry(width, height), this.material);
    this.mesh.name = name;
  }

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }

  commit(): void {
    this.texture.needsUpdate = true;
  }

  dispose(): void {
    this.texture.dispose();
    this.material.dispose();
    this.mesh.geometry.dispose();
  }
}

/** Draw a rounded, high-contrast pill of text centred in a TextPlane. */
export function drawPill(plane: TextPlane, text: string, opts: { size?: number } = {}): void {
  const { ctx, width, height } = plane;
  ctx.clearRect(0, 0, width, height);
  if (!text) {
    plane.commit();
    return;
  }
  let size = opts.size ?? Math.round(height * 0.5);
  ctx.font = `700 ${size}px ${FONT}`;
  while (ctx.measureText(text).width > width * 0.9 && size > 12) {
    size -= 2;
    ctx.font = `700 ${size}px ${FONT}`;
  }
  const textWidth = ctx.measureText(text).width;
  const padX = size * 0.6;
  const w = Math.min(width, textWidth + padX * 2);
  const h = Math.min(height, size * 1.7);
  const x = (width - w) / 2;
  const y = (height - h) / 2;
  ctx.fillStyle = 'rgba(12,11,10,0.86)';
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = '#fffaf0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2 + size * 0.04);
  plane.commit();
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** The pool of warm light on the desk: an additive radial falloff. */
export function createLightPool(radius: number): { mesh: Mesh; material: ShaderMaterial } {
  const material = new ShaderMaterial({
    name: 'LightPool',
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uColor: { value: new Color(0xffc879) },
      uIntensity: { value: 0 },
      uBreath: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uBreath;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float core = smoothstep(1.0, 0.55, d);
        float edge = smoothstep(1.0, 0.92, d) * 0.25;
        float a = (core * 0.42 + edge) * uIntensity * (1.0 + 0.08 * uBreath);
        gl_FragColor = vec4(uColor * a, a);
      }`,
  });
  const mesh = new Mesh(new PlaneGeometry(radius * 2, radius * 2), material);
  mesh.name = 'LightPool';
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = -1;
  return { mesh, material };
}

/**
 * Dims the passthrough room outside the lamp's light. A page cannot restyle
 * passthrough, so this is a dark shell around the viewer with a soft hole in
 * the direction of the pool of light.
 */
export class RoomDimmer {
  readonly mesh: Mesh;
  private readonly material: ShaderMaterial;

  constructor() {
    this.material = new ShaderMaterial({
      name: 'RoomDimmer',
      transparent: true,
      depthWrite: false,
      side: BackSide,
      uniforms: {
        uAmount: { value: 0 },
        uHoleDir: { value: new Vector3(0, -0.5, -1).normalize() },
        uHoleCos: { value: Math.cos(0.3) },
        uSoftCos: { value: Math.cos(0.48) },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uAmount;
        uniform vec3 uHoleDir;
        uniform float uHoleCos;
        uniform float uSoftCos;
        varying vec3 vDir;
        void main() {
          float c = dot(normalize(vDir), uHoleDir);
          float outside = 1.0 - smoothstep(uSoftCos, uHoleCos, c);
          gl_FragColor = vec4(0.02, 0.018, 0.015, uAmount * outside);
        }`,
    });
    this.mesh = new Mesh(new SphereGeometry(4, 32, 16), this.material);
    this.mesh.name = 'RoomDimmer';
    this.mesh.renderOrder = -10;
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
  }

  /** amount 0..1; hole direction from the eye to the pool, angular radius in rad. */
  update(amount: number, holeDir: Vector3, holeAngle: number): void {
    this.material.uniforms.uAmount!.value = amount * 0.62;
    (this.material.uniforms.uHoleDir!.value as Vector3).copy(holeDir);
    this.material.uniforms.uHoleCos!.value = Math.cos(holeAngle);
    this.material.uniforms.uSoftCos!.value = Math.cos(holeAngle * 1.6);
    this.mesh.visible = amount > 0.002;
  }
}

/**
 * A wordless demonstration of the one gesture: two fingertip dots that close
 * into a pinch, slide along a path and open again.
 */
export class GhostPinch {
  readonly root = new Group();
  private readonly thumb: Mesh;
  private readonly index: Mesh;
  private readonly trail: Mesh;
  private readonly material: MeshBasicMaterial;
  readonly from = new Vector3();
  readonly to = new Vector3();
  private t = 0;

  constructor() {
    this.root.name = 'GhostPinch';
    this.material = new MeshBasicMaterial({
      color: 0xfff2d6,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      depthTest: false,
    });
    const tip = new SphereGeometry(0.0065, 16, 12);
    this.thumb = new Mesh(tip, this.material);
    this.index = new Mesh(tip, this.material);
    this.trail = new Mesh(new SphereGeometry(0.003, 8, 6), this.material);
    this.thumb.renderOrder = this.index.renderOrder = this.trail.renderOrder = 20;
    this.root.add(this.thumb, this.index, this.trail);
    this.root.visible = false;
  }

  show(from: Vector3, to: Vector3): void {
    this.from.copy(from);
    this.to.copy(to);
    this.t = 0;
    this.root.visible = true;
  }

  hide(): void {
    this.root.visible = false;
  }

  /** Loop: approach open (0-0.2), close (0.2-0.3), slide (0.3-0.75), open (0.75-0.85), fade. */
  update(delta: number): void {
    if (!this.root.visible) return;
    this.t = (this.t + delta / 2.6) % 1;
    const t = this.t;
    const slide = smooth((t - 0.3) / 0.45);
    const close = t < 0.2 ? 0 : t < 0.3 ? (t - 0.2) / 0.1 : t < 0.75 ? 1 : t < 0.85 ? 1 - (t - 0.75) / 0.1 : 0;
    const gap = 0.024 * (1 - close) + 0.004;
    const x = this.from.x + (this.to.x - this.from.x) * slide;
    const y = this.from.y + (this.to.y - this.from.y) * slide + 0.03 * (1 - close);
    const z = this.from.z + (this.to.z - this.from.z) * slide;
    this.thumb.position.set(x - gap / 2, y, z + 0.004);
    this.index.position.set(x + gap / 2, y + 0.002, z - 0.004);
    this.trail.position.set(this.from.x + (this.to.x - this.from.x) * slide * 0.5, this.from.y, this.from.z + (this.to.z - this.from.z) * slide * 0.5);
    this.trail.visible = close > 0.5;
    this.material.opacity = t > 0.9 ? 0.85 * (1 - (t - 0.9) / 0.1) : t < 0.06 ? 0.85 * (t / 0.06) : 0.85;
  }
}

function smooth(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}
