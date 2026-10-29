import { Matrix4, Quaternion, Vector3 } from '@iwsdk/core';
import type { Object3D, WebGLRenderer, XROrigin } from '@iwsdk/core';

/**
 * Pins the lamp to a spot in the real room with a WebXR persistent anchor,
 * so the next session finds it where it was left (for example on the desk
 * in another room). The saved id lives in Lamplight's state; this class only
 * talks to the device.
 */
export class LampAnchor {
  private anchor: XRAnchor | null = null;
  private pending = false;
  private readonly mat = new Matrix4();
  private readonly inv = new Matrix4();
  private readonly pos = new Vector3();
  private readonly quat = new Quaternion();
  private readonly scale = new Vector3();

  constructor(
    private readonly renderer: WebGLRenderer,
    private readonly player: XROrigin,
  ) {}

  /** True when this session can create and keep persistent anchors. */
  get supported(): boolean {
    const session = this.renderer.xr.getSession();
    return Boolean(
      session &&
        typeof session.restorePersistentAnchor === 'function' &&
        typeof XRFrame !== 'undefined' &&
        typeof XRFrame.prototype.createAnchor === 'function',
    );
  }

  get tracking(): boolean {
    return this.anchor !== null;
  }

  /** Restore a saved anchor. Resolves false if the device no longer has it. */
  async restore(uuid: string): Promise<boolean> {
    const session = this.renderer.xr.getSession();
    if (!session?.restorePersistentAnchor) return false;
    try {
      this.anchor = await session.restorePersistentAnchor(uuid);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Write the anchored pose into `target` (a world-space object). Returns
   * false while the device has not located the anchor yet.
   */
  readPose(target: Object3D): boolean {
    const frame = this.renderer.xr.getFrame();
    const ref = this.renderer.xr.getReferenceSpace();
    if (!this.anchor || !frame || !ref) return false;
    if (!frame.trackedAnchors?.has(this.anchor)) return false;
    const pose = frame.getPose(this.anchor.anchorSpace, ref);
    if (!pose) return false;
    this.player.updateWorldMatrix(true, false);
    this.mat.fromArray(pose.transform.matrix).premultiply(this.player.matrixWorld);
    this.mat.decompose(this.pos, this.quat, this.scale);
    target.position.copy(this.pos);
    target.quaternion.copy(this.quat);
    return true;
  }

  /**
   * Anchor `target` where it is now and make it persistent. Replaces and
   * deletes `previous`. Resolves with the new id, or null if it failed.
   */
  async pin(target: Object3D, previous: string | null): Promise<string | null> {
    const session = this.renderer.xr.getSession();
    const frame = this.renderer.xr.getFrame();
    const ref = this.renderer.xr.getReferenceSpace();
    if (!session || !frame?.createAnchor || !ref || this.pending) return null;
    this.pending = true;
    try {
      this.release();
      // createAnchor must use this frame, so call it before any await.
      target.updateWorldMatrix(true, false);
      this.player.updateWorldMatrix(true, false);
      // Reference-space pose = inverse(rig) * world pose.
      this.mat.copy(target.matrixWorld).premultiply(this.inv.copy(this.player.matrixWorld).invert());
      this.mat.decompose(this.pos, this.quat, this.scale);
      const transform = new XRRigidTransform(
        { x: this.pos.x, y: this.pos.y, z: this.pos.z, w: 1 },
        { x: this.quat.x, y: this.quat.y, z: this.quat.z, w: this.quat.w },
      );
      const anchor = await frame.createAnchor(transform, ref);
      this.anchor = anchor;
      const id = (await anchor.requestPersistentHandle?.()) ?? null;
      if (previous && previous !== id) await session.deletePersistentAnchor?.(previous).catch(() => undefined);
      return id;
    } catch {
      return null;
    } finally {
      this.pending = false;
    }
  }

  /** Stop following the anchor (it stays saved on the device). */
  release(): void {
    this.anchor?.delete();
    this.anchor = null;
  }
}
