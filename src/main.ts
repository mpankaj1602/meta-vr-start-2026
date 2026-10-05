import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { createScene } from './scene';
import { setupControllers } from './controllers';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
// 'local-floor' puts y=0 at the player's physical floor.
renderer.xr.setReferenceSpaceType('local-floor');
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 100);
camera.position.set(0, 1.6, 2.5);

const { scene, grabbables, update: updateScene } = createScene();
const { update: updateControllers } = setupControllers(renderer, scene, grabbables);

// Desktop fallback so the scene can be inspected without a headset.
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 1.2, 0);
orbit.update();

const status = document.getElementById('status')!;
if (navigator.xr) {
  navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    status.textContent = supported
      ? 'WebXR ready — press “Enter VR”.'
      : 'No VR device found — drag to orbit the scene.';
  });
} else {
  status.textContent = 'WebXR unavailable in this browser — drag to orbit the scene.';
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  updateScene(dt);
  updateControllers();
  renderer.render(scene, camera);
});
