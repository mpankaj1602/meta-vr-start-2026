import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';

const RAY_LENGTH = 5;
const HIGHLIGHT = 0x333333;

type Grabbable = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

export function setupControllers(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  grabbables: THREE.Group,
) {
  const controllerModels = new XRControllerModelFactory();
  const handModels = new XRHandModelFactory();
  const raycaster = new THREE.Raycaster();
  raycaster.far = RAY_LENGTH;
  const rotation = new THREE.Matrix4();

  const controllers: THREE.XRTargetRaySpace[] = [];
  const hovered = new Set<Grabbable>();

  const intersect = (controller: THREE.Object3D) => {
    rotation.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(rotation);
    return raycaster.intersectObjects(grabbables.children, false)[0];
  };

  for (let i = 0; i < 2; i++) {
    // Target ray space: where the controller (or pinching hand) is pointing.
    const controller = renderer.xr.getController(i);
    controller.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -1),
        ]),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }),
      ),
    );
    controller.children[0].scale.z = RAY_LENGTH;

    controller.addEventListener('selectstart', () => {
      const hit = intersect(controller);
      if (!hit) return;
      const object = hit.object as Grabbable;
      controller.attach(object);
      controller.userData.held = object;
    });

    controller.addEventListener('selectend', () => {
      const held = controller.userData.held as Grabbable | undefined;
      if (!held) return;
      grabbables.attach(held);
      controller.userData.held = undefined;
    });

    scene.add(controller);
    controllers.push(controller);

    // Grip space: where the controller is physically held; carries the model.
    const grip = renderer.xr.getControllerGrip(i);
    grip.add(controllerModels.createControllerModel(grip));
    scene.add(grip);

    const hand = renderer.xr.getHand(i);
    hand.add(handModels.createHandModel(hand, 'mesh'));
    scene.add(hand);
  }

  const update = () => {
    for (const object of hovered) object.material.emissive.setHex(0x000000);
    hovered.clear();

    if (!renderer.xr.isPresenting) return;

    for (const controller of controllers) {
      const line = controller.children[0];
      if (controller.userData.held) {
        line.scale.z = 0.05;
        continue;
      }
      const hit = intersect(controller);
      if (hit) {
        const object = hit.object as Grabbable;
        object.material.emissive.setHex(HIGHLIGHT);
        hovered.add(object);
        line.scale.z = hit.distance;
      } else {
        line.scale.z = RAY_LENGTH;
      }
    }
  };

  return { update };
}
