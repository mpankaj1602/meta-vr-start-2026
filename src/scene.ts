import * as THREE from 'three';

export interface SceneBundle {
  scene: THREE.Scene;
  grabbables: THREE.Group;
  update: (dt: number) => void;
}

export function createScene(): SceneBundle {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0d12);
  scene.fog = new THREE.Fog(0x0b0d12, 8, 30);

  scene.add(new THREE.HemisphereLight(0xbcd4ff, 0x20242e, 1.2));

  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(3, 6, 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(12, 64),
    new THREE.MeshStandardMaterial({ color: 0x1a1f2b, roughness: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(24, 24, 0x3b82f6, 0x263042);
  grid.position.y = 0.001;
  scene.add(grid);

  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.05, 48),
    new THREE.MeshStandardMaterial({ color: 0x2b3345, roughness: 0.6 }),
  );
  table.position.set(0, 0.9, -0.8);
  table.receiveShadow = true;
  scene.add(table);

  // Objects the controllers can pick up.
  const grabbables = new THREE.Group();
  scene.add(grabbables);

  const geometries = [
    new THREE.BoxGeometry(0.14, 0.14, 0.14),
    new THREE.IcosahedronGeometry(0.09),
    new THREE.TorusKnotGeometry(0.06, 0.02, 96, 12),
    new THREE.ConeGeometry(0.08, 0.16, 24),
    new THREE.SphereGeometry(0.08, 32, 16),
  ];
  const colors = [0x3b82f6, 0xf59e0b, 0x10b981, 0xef4444, 0xa855f7];

  geometries.forEach((geometry, i) => {
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.35, metalness: 0.1 }),
    );
    const angle = (i / geometries.length) * Math.PI * 2;
    mesh.position.set(Math.cos(angle) * 0.35, 1.05, -0.8 + Math.sin(angle) * 0.35);
    mesh.castShadow = true;
    grabbables.add(mesh);
  });

  const update = (dt: number) => {
    for (const mesh of grabbables.children) {
      mesh.rotation.y += dt * 0.5;
    }
  };

  return { scene, grabbables, update };
}
