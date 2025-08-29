import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import { Sky } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

//FLOOR TEXTURE
const floorAlpha = textureLoader.load('./floor/alpha.jpg');

const floorColorTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_land_rocks_01_diff_1k.jpg'
);

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floorARMTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_land_rocks_01_arm_1k.jpg'
);

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

const floorNormalTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_land_rocks_01_nor_gl_1k.jpg'
);

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const floorDisplacementTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_land_rocks_01_disp_1k.jpg'
);

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// WALL TEXTURE
const wallColorTexture = textureLoader.load(
  './assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg'
);

const wallArmTexture = textureLoader.load(
  './assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg'
);

const wallNormalTexture = textureLoader.load(
  './assets/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg'
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// ROOF TEXTURE
const roofColorTexture = textureLoader.load(
  './assets/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg'
);

const roofArmTexture = textureLoader.load(
  './assets/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg'
);

const roofNormalTexture = textureLoader.load(
  './assets/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg'
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofArmTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofArmTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// BUSHES TEXTURE
const leavesColorTexture = textureLoader.load(
  './assets/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg'
);

const leavesArmTexture = textureLoader.load(
  './assets/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg'
);

const leavesNormalTexture = textureLoader.load(
  './assets/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg'
);

leavesColorTexture.colorSpace = THREE.SRGBColorSpace;

leavesColorTexture.repeat.set(3, 1);
leavesArmTexture.repeat.set(3, 1);
leavesNormalTexture.repeat.set(3, 1);

leavesColorTexture.wrapS = THREE.RepeatWrapping;
leavesArmTexture.wrapS = THREE.RepeatWrapping;
leavesNormalTexture.wrapS = THREE.RepeatWrapping;

// GRAVES
const gravesColorTexture = textureLoader.load(
  './assets/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg'
);

const gravesArmTexture = textureLoader.load(
  './assets/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg'
);

const gravesNormalTexture = textureLoader.load(
  './assets/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg'
);

gravesColorTexture.colorSpace = THREE.SRGBColorSpace;

gravesColorTexture.repeat.set(3, 1);
gravesArmTexture.repeat.set(3, 1);
gravesNormalTexture.repeat.set(3, 1);

gravesColorTexture.wrapS = THREE.RepeatWrapping;
gravesArmTexture.wrapS = THREE.RepeatWrapping;
gravesNormalTexture.wrapS = THREE.RepeatWrapping;

// DOOR
const doorColorTexture = textureLoader.load('./assets/door/color.jpg');

const doorAlphaTexture = textureLoader.load('./assets/door/alpha.jpg');

const doorAmbientOccTexture = textureLoader.load(
  './assets/door/ambientOcclusion.jpg'
);

const doorHeightTexture = textureLoader.load('./assets/door/height.jpg');

const doorMetalnessTexture = textureLoader.load('./assets/door/metalness.jpg');

const doorRoughnessTexture = textureLoader.load('./assets/door/roughness.jpg');

const doorNormalTexture = textureLoader.load('./assets/door/normal.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// doorColorTexture.repeat.set(3, 1);
// doorArmTexture.repeat.set(3, 1);
// doorNormalTexture.repeat.set(3, 1);

// doorColorTexture.wrapS = THREE.RepeatWrapping;
// doorArmTexture.wrapS = THREE.RepeatWrapping;
// doorNormalTexture.wrapS = THREE.RepeatWrapping;

/**
 * House
 */

const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
  roofHeight: 1.5,
};

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlpha,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    roughness: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.025,
  })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

gui
  .add(floor.material, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.001)
  .name('floor displacement scale');
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001);

// House Container
const house = new THREE.Group();
scene.add(house);

// Walls

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMeasurements.width,
    houseMeasurements.height,
    houseMeasurements.depth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallArmTexture,
    roughnessMap: wallArmTexture,
    metalnessMap: wallArmTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = houseMeasurements.height / 2;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3, houseMeasurements.roofHeight, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofArmTexture,
    roughnessMap: roofArmTexture,
    metalnessMap: roofArmTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = houseMeasurements.height + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAmbientOccTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorHeightTexture,
    displacementBias: -0.04,
    displacementScale: 0.15,
    alphaMap: doorAlphaTexture,
    transparent: true,
  })
);
house.add(door);
door.position.y = 1;
door.position.z = 2 + 0.01; //avoid z fighting

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: leavesColorTexture,
  aoMap: leavesArmTexture,
  metalnessMap: leavesArmTexture,
  roughnessMap: leavesArmTexture,
  normalMap: leavesNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.15, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// GRAVES
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: gravesColorTexture,
  aoMap: gravesArmTexture,
  roughnessMap: gravesArmTexture,
  metalnessMap: gravesArmTexture,
  normalMap: gravesNormalTexture,
});

const gravesGroup = new THREE.Group();
scene.add(gravesGroup);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * (Math.PI * 2);
  const radius = 4 + Math.random() * 4;
  //pos on circle according to this circle
  // we use z for 3d coords, on 2d would be x and y
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.z = z;
  grave.position.y = Math.random() * 0.4;
  grave.rotation.x = Math.random() - 0.5;
  grave.rotation.y = Math.random() - 0.5;
  gravesGroup.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#d55f5f', 0.8);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5);
house.add(doorLight);

doorLight.position.set(0, 2.2, 2.5);

//GHOSTS

const ghost1 = new THREE.PointLight('#e3d5cf', 5);
const ghost2 = new THREE.PointLight('#c0d3c6', 5);
const ghost3 = new THREE.PointLight('#bdc2d1', 5);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//SHADOWS
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Directional light shadow setup
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;

// Door light shadow setup
doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.near = 0.1;
doorLight.shadow.camera.far = 10;

// Ghost lights shadow setup
ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.near = 0.1;
ghost1.shadow.camera.far = 10;

ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.near = 0.1;
ghost2.shadow.camera.far = 10;

ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.near = 0.1;
ghost3.shadow.camera.far = 10;

floor.receiveShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
roof.receiveShadow = true;

for (let grave of gravesGroup.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

// SKY
const skyVector = new THREE.Vector3(0.3, -0.038, -0.95);
const sky = new Sky();
sky.scale.set(100, 100, 100)
scene.add(sky);
sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

//FOG
// scene.fog = new THREE.Fog('#ff0000', 10, 13)
scene.fog = new THREE.FogExp2('#ece3e3',0.08)

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  //Ghosts animate
  const ghostAngle = elapsedTime / 2;
  const radius = 8;
  ghost1.position.x = Math.cos(ghostAngle + 1) * radius;
  ghost1.position.z = Math.sin(ghostAngle + 1) * radius;

  ghost2.position.x = Math.cos(ghostAngle + 5) * radius;
  ghost2.position.z = Math.sin(ghostAngle + 5) * radius;

  ghost3.position.x = -Math.cos(ghostAngle - 2) * radius;
  ghost3.position.z = -Math.sin(ghostAngle - 2) * radius;
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
