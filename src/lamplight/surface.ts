import { Matrix4, Vector3 } from '@iwsdk/core';
import type { WebGLRenderer, XROrigin } from '@iwsdk/core';

export type SurfaceResult = { found: true; y: number } | { found: false };

/**
 * Finds the real surface under a point with a single downward WebXR hit test.
 * Depth-based hit testing needs no room setup. If the device offers no hit
 * test, or nothing is found within reach, the caller falls back to a
 * floating tray.
 */
export class SurfaceProbe {
  private source: XRHitTestSource | null = null;
  private requested = false;
  private elapsed = 0;
  private originY = 0;
  private resolve: ((result: SurfaceResult) => void) | null = null;
  private readonly mat = new Matrix4();
  private readonly hit = new Vector3();
  private readonly local = new Vector3();

  constructor(
    private readonly renderer: WebGLRenderer,
    private readonly player: XROrigin,
    /** How far below the release point a surface may be and still count. */
    private readonly maxDrop = 0.45,
    private readonly timeout = 1.2,
  ) {}

  get busy(): boolean {
    return this.resolve !== null;
  }

  /** Probe straight down from a world-space point. */
  probe(worldPoint: Vector3, done: (result: SurfaceResult) => void): void {
    this.cancel();
    const session = this.renderer.xr.getSession();
    const ref = this.renderer.xr.getReferenceSpace();
    if (!session || !ref || typeof session.requestHitTestSource !== 'function' || typeof XRRay === 'undefined') {
      done({ found: false });
      return;
    }
    this.resolve = done;
    this.elapsed = 0;
    this.requested = true;
    this.originY = worldPoint.y;
    // Reference space coordinates: undo the player rig transform.
    this.player.updateWorldMatrix(true, false);
    this.local.copy(worldPoint).applyMatrix4(this.mat.copy(this.player.matrixWorld).invert());
    const ray = new XRRay(
      { x: this.local.x, y: this.local.y + 0.05, z: this.local.z, w: 1 },
      { x: 0, y: -1, z: 0, w: 0 },
    );
    try {
      session
        .requestHitTestSource!({ space: ref, offsetRay: ray })!
        .then((source) => {
          if (this.requested) this.source = source;
          else source.cancel();
        })
        .catch(() => this.finish({ found: false }));
    } catch {
      // Hit testing was not granted for this session: fall back to the tray.
      this.finish({ found: false });
    }
  }

  update(delta: number): void {
    if (!this.resolve) return;
    this.elapsed += delta;
    const frame = this.renderer.xr.getFrame();
    const ref = this.renderer.xr.getReferenceSpace();
    if (this.source && frame && ref) {
      const results = frame.getHitTestResults(this.source);
      for (const result of results) {
        const pose = result.getPose(ref);
        if (!pose) continue;
        this.mat.fromArray(pose.transform.matrix).premultiply(this.player.matrixWorld);
        this.hit.setFromMatrixPosition(this.mat);
        // Accept roughly horizontal surfaces below the release point.
        const upY = this.mat.elements[5]!;
        const drop = this.originY - this.hit.y;
        if (upY > 0.85 && drop > -0.03 && drop < this.maxDrop) {
          this.finish({ found: true, y: this.hit.y });
          return;
        }
      }
    }
    if (this.elapsed > this.timeout) this.finish({ found: false });
  }

  cancel(): void {
    this.requested = false;
    this.source?.cancel();
    this.source = null;
    this.resolve = null;
  }

  private finish(result: SurfaceResult): void {
    const done = this.resolve;
    this.cancel();
    done?.(result);
  }
}
