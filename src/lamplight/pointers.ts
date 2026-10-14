import { Matrix4, Quaternion, Raycaster, Vector2, Vector3 } from '@iwsdk/core';
import type { PerspectiveCamera, WebGLRenderer, XROrigin } from '@iwsdk/core';

export type PointerId = 'left' | 'right' | 'mouse';

/** One thing that can pinch: a tracked hand, a controller, a gaze/transient
 * pointer or, outside the headset, the mouse. Positions are in world space. */
export class Pointer {
  readonly id: PointerId;
  selecting = false;
  /** True when the input is a tracked hand (fingertip is meaningful). */
  isHand = false;
  hasTip = false;
  hasRay = false;
  readonly tip = new Vector3();
  readonly rayOrigin = new Vector3();
  readonly rayDir = new Vector3(0, 0, -1);
  inputSource: XRInputSource | null = null;

  constructor(id: PointerId) {
    this.id = id;
  }
}

export interface PointerHandlers {
  onStart(pointer: Pointer): void;
  onEnd(pointer: Pointer): void;
}

/**
 * Tracks pinch state from WebXR select events and refreshes pointer poses
 * each frame. Start and end handlers run synchronously inside the input
 * event, which counts as a user gesture: that is what lets a pinch focus a
 * text field and raise the system keyboard inside the immersive session.
 */
export class PointerTracker {
  readonly left = new Pointer('left');
  readonly right = new Pointer('right');
  readonly mouse = new Pointer('mouse');
  readonly all: readonly Pointer[] = [this.left, this.right, this.mouse];

  private session: XRSession | null = null;
  private readonly cleanup: Array<() => void> = [];
  private readonly mat = new Matrix4();
  private readonly quat = new Quaternion();
  private readonly ndc = new Vector2();
  private readonly raycaster = new Raycaster();
  private mouseInside = false;

  constructor(
    private readonly renderer: WebGLRenderer,
    private readonly camera: PerspectiveCamera,
    private readonly player: XROrigin,
    private readonly handlers: PointerHandlers,
  ) {
    const canvas = renderer.domElement;
    const down = (e: PointerEvent) => {
      if (this.session || e.button !== 0) return;
      this.setMouse(e);
      this.mouse.selecting = true;
      canvas.setPointerCapture(e.pointerId);
      this.handlers.onStart(this.mouse);
    };
    const move = (e: PointerEvent) => this.setMouse(e);
    const up = (e: PointerEvent) => {
      if (!this.mouse.selecting) return;
      this.setMouse(e);
      this.mouse.selecting = false;
      this.handlers.onEnd(this.mouse);
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    this.cleanup.push(() => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    });
  }

  /** Begin listening to an immersive session's select events. */
  attachSession(session: XRSession): void {
    this.detachSession();
    this.session = session;
    this.mouse.selecting = false;
    this.mouse.hasRay = false;
    const start = (e: XRInputSourceEvent) => {
      const p = this.forSource(e.inputSource);
      if (!p) return;
      p.inputSource = e.inputSource;
      this.refreshPointer(p, e.frame);
      p.selecting = true;
      this.handlers.onStart(p);
    };
    const end = (e: XRInputSourceEvent) => {
      const p = this.forSource(e.inputSource);
      if (!p || !p.selecting) return;
      this.refreshPointer(p, e.frame);
      p.selecting = false;
      this.handlers.onEnd(p);
    };
    session.addEventListener('selectstart', start);
    session.addEventListener('selectend', end);
    this.sessionCleanup = () => {
      session.removeEventListener('selectstart', start);
      session.removeEventListener('selectend', end);
    };
  }

  private sessionCleanup: (() => void) | null = null;

  detachSession(): void {
    this.sessionCleanup?.();
    this.sessionCleanup = null;
    this.session = null;
    for (const p of [this.left, this.right]) {
      if (p.selecting) {
        p.selecting = false;
        this.handlers.onEnd(p);
      }
      p.inputSource = null;
      p.hasRay = p.hasTip = false;
    }
  }

  /** Refresh every pointer's pose. Call once per frame before using them. */
  update(): void {
    if (this.session) {
      const frame = this.renderer.xr.getFrame();
      const sources = this.session.inputSources;
      // Keep tracked hands and controllers bound even when not pinching.
      // Gaze and transient sources are bound only by their own select events.
      for (let i = 0; i < sources.length; i += 1) {
        const source = sources[i]!;
        if (source.targetRayMode !== 'tracked-pointer' || source.handedness === 'none') continue;
        const p = this.forSource(source);
        if (p && !(p.selecting && p.inputSource && p.inputSource !== source)) p.inputSource = source;
      }
      this.refreshPointer(this.left, frame);
      this.refreshPointer(this.right, frame);
    } else if (this.mouseInside || this.mouse.selecting) {
      this.raycaster.setFromCamera(this.ndc, this.camera);
      this.mouse.rayOrigin.copy(this.raycaster.ray.origin);
      this.mouse.rayDir.copy(this.raycaster.ray.direction);
      this.mouse.hasRay = true;
    }
  }

  dispose(): void {
    this.detachSession();
    for (const fn of this.cleanup) fn();
  }

  private forSource(source: XRInputSource): Pointer | null {
    if (source.handedness === 'left') return this.left;
    if (source.handedness === 'right') return this.right;
    // Gaze or unhanded transient pointers drive the right-hand slot.
    return source.targetRayMode === 'transient-pointer' || source.targetRayMode === 'gaze'
      ? this.right
      : null;
  }

  private refreshPointer(p: Pointer, frame: XRFrame | null | undefined): void {
    const source = p.inputSource;
    if (!source) {
      p.hasRay = p.hasTip = false;
      return;
    }
    p.isHand = source.hand != null;
    const side = p.id === 'left' ? 'left' : 'right';
    if (source.targetRayMode === 'transient-pointer' || source.targetRayMode === 'gaze') {
      p.hasTip = false;
      p.hasRay = this.rayFromFrame(p, source, frame);
      return;
    }
    const tipSpace = p.isHand ? this.player.indexTipSpaces[side] : this.player.gripSpaces[side];
    tipSpace.updateWorldMatrix(true, false);
    p.tip.setFromMatrixPosition(tipSpace.matrixWorld);
    p.hasTip = true;
    // Eye gaze, where the device has it, points; otherwise the hand ray does.
    const raySpace = this.player.gazeOrigin === 'tracked' ? this.player.eyeSpace : this.player.raySpaces[side];
    raySpace.updateWorldMatrix(true, false);
    p.rayOrigin.setFromMatrixPosition(raySpace.matrixWorld);
    raySpace.getWorldQuaternion(this.quat);
    p.rayDir.set(0, 0, -1).applyQuaternion(this.quat);
    p.hasRay = true;
  }

  private rayFromFrame(p: Pointer, source: XRInputSource, frame: XRFrame | null | undefined): boolean {
    const ref = this.renderer.xr.getReferenceSpace();
    if (!frame || !ref) return false;
    const pose = frame.getPose(source.targetRaySpace, ref);
    if (!pose) return false;
    this.player.updateWorldMatrix(true, false);
    this.mat.fromArray(pose.transform.matrix).premultiply(this.player.matrixWorld);
    p.rayOrigin.setFromMatrixPosition(this.mat);
    this.quat.setFromRotationMatrix(this.mat);
    p.rayDir.set(0, 0, -1).applyQuaternion(this.quat);
    return true;
  }

  private setMouse(e: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.mouseInside = true;
    this.raycaster.setFromCamera(this.ndc, this.camera);
    this.mouse.rayOrigin.copy(this.raycaster.ray.origin);
    this.mouse.rayDir.copy(this.raycaster.ray.direction);
    this.mouse.hasRay = true;
  }
}
