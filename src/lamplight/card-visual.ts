import {
  CanvasTexture,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SRGBColorSpace,
} from '@iwsdk/core';
import { CARD_DEPTH, CARD_WIDTH } from './layout.js';

const TEX_W = 600;
const TEX_H = Math.round((TEX_W * CARD_DEPTH) / CARD_WIDTH);
const PAPER = '#f7f0e1';
const INK = '#1b1813';
const FONT = '"Atkinson Hyperlegible", "Segoe UI", system-ui, sans-serif';

export type CardFace =
  | { kind: 'text'; text: string; done: boolean; own: boolean }
  | { kind: 'blank'; draft: string; editing: boolean };

/**
 * A paper card lying flat in the desk plane. Local origin at the card's
 * centre on the desk; the face looks up (+Y) and reads from the user's side.
 */
export class CardVisual {
  readonly root = new Group();
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly texture: CanvasTexture;
  private readonly face: Mesh;
  private readonly glow: Mesh;
  private readonly glowMaterial: MeshBasicMaterial;
  private readonly faceMaterial: MeshStandardMaterial;
  private curl = 0;

  constructor(name: string) {
    this.root.name = name;
    this.canvas = document.createElement('canvas');
    this.canvas.width = TEX_W;
    this.canvas.height = TEX_H;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new CanvasTexture(this.canvas);
    this.texture.colorSpace = SRGBColorSpace;
    this.texture.anisotropy = 4;

    this.faceMaterial = new MeshStandardMaterial({
      map: this.texture,
      roughness: 0.92,
      metalness: 0,
      emissive: 0xffffff,
      emissiveMap: this.texture,
      emissiveIntensity: 0.08,
    });
    this.face = new Mesh(new PlaneGeometry(CARD_WIDTH, CARD_DEPTH, 6, 4), this.faceMaterial);
    this.face.name = `${name}Face`;
    this.face.rotation.x = -Math.PI / 2;
    this.face.position.y = 0.0015;

    // A warm rim drawn just under the card: shown when held, hovered or pointed at.
    this.glowMaterial = new MeshBasicMaterial({
      color: 0xffc76b,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    this.glow = new Mesh(new PlaneGeometry(CARD_WIDTH + 0.008, CARD_DEPTH + 0.008), this.glowMaterial);
    this.glow.name = `${name}Glow`;
    this.glow.rotation.x = -Math.PI / 2;
    this.glow.position.y = 0.0008;
    this.glow.renderOrder = 1;
    this.root.add(this.glow, this.face);
  }

  setGlow(opacity: number): void {
    this.glowMaterial.opacity = opacity;
    this.glow.visible = opacity > 0.001;
  }

  setBrightness(lit: number): void {
    // Cards inside the pool read brighter; outside they fall toward the room.
    this.faceMaterial.emissiveIntensity = 0.05 + 0.35 * lit;
  }

  setOpacity(opacity: number): void {
    this.faceMaterial.transparent = opacity < 1;
    this.faceMaterial.opacity = opacity;
  }

  /** Carried cards curl at one corner: 0 flat, 1 clearly curled. */
  setCurl(amount: number): void {
    if (amount === this.curl) return;
    this.curl = amount;
    const pos = this.face.geometry.attributes.position!;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i) / (CARD_WIDTH / 2); // -1..1
      const y = pos.getY(i) / (CARD_DEPTH / 2); // -1..1 (+1 is far edge)
      // Lift the far-right corner; local Z of the plane is world up.
      const t = Math.max(0, (x + y) / 2);
      pos.setZ(i, amount * 0.009 * t * t * t);
    }
    pos.needsUpdate = true;
    this.face.geometry.computeVertexNormals();
  }

  draw(face: CardFace): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, TEX_W, TEX_H);
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, TEX_W, TEX_H);
    ctx.strokeStyle = 'rgba(27,24,19,0.25)';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, TEX_W - 6, TEX_H - 6);

    if (face.kind === 'blank') {
      ctx.setLineDash([22, 16]);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 7;
      ctx.strokeRect(22, 22, TEX_W - 44, TEX_H - 44);
      ctx.setLineDash([]);
      if (face.draft || face.editing) {
        this.drawWrapped(face.draft + (face.editing ? '|' : ''), INK);
      } else {
        ctx.fillStyle = INK;
        ctx.font = `700 92px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+ write', TEX_W / 2, TEX_H / 2 + 4);
      }
    } else {
      this.drawWrapped(face.text, face.done ? 'rgba(27,24,19,0.55)' : INK);
      if (face.own) {
        // A folded corner marks the user's own cards without relying on colour.
        ctx.fillStyle = 'rgba(27,24,19,0.18)';
        ctx.beginPath();
        ctx.moveTo(TEX_W - 70, 0);
        ctx.lineTo(TEX_W, 0);
        ctx.lineTo(TEX_W, 70);
        ctx.closePath();
        ctx.fill();
      }
      if (face.done) this.drawStamp();
    }
    this.texture.needsUpdate = true;
  }

  private drawWrapped(text: string, color: string): void {
    const ctx = this.ctx;
    const maxWidth = TEX_W - 80;
    let size = 84;
    let lines: string[] = [];
    while (size >= 44) {
      ctx.font = `700 ${size}px ${FONT}`;
      lines = wrap(ctx, text, maxWidth);
      if (lines.length * size * 1.12 <= TEX_H - 70) break;
      size -= 6;
    }
    const lineHeight = size * 1.12;
    const maxLines = Math.floor((TEX_H - 70) / lineHeight);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = `${lines[maxLines - 1]!.replace(/\s*\S{0,3}$/u, '')}…`;
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const top = TEX_H / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => ctx.fillText(line, TEX_W / 2, top + i * lineHeight));
  }

  private drawStamp(): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(TEX_W * 0.72, TEX_H * 0.66);
    ctx.rotate(-0.18);
    ctx.strokeStyle = '#7a1f12';
    ctx.lineWidth = 10;
    ctx.strokeRect(-120, -48, 240, 96);
    ctx.fillStyle = '#7a1f12';
    ctx.font = `800 70px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DONE', 0, 4);
    ctx.restore();
  }

  dispose(): void {
    this.texture.dispose();
    this.faceMaterial.dispose();
    this.glowMaterial.dispose();
    this.face.geometry.dispose();
    this.glow.geometry.dispose();
  }
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line || lines.length === 0) lines.push(line);
  return lines;
}
