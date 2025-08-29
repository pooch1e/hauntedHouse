import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
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
  new THREE.PlaneGeometry(20, 20, 1, 1),
  new THREE.MeshStandardMaterial({ alphaMap: floorAlpha, transparent: true })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

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
  new THREE.MeshStandardMaterial()
);
walls.position.y = houseMeasurements.height / 2;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3, houseMeasurements.roofHeight, 4),
  new THREE.MeshStandardMaterial()
);
roof.position.y = houseMeasurements.height + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial({ color: 'red' })
);
house.add(door);
door.position.y = 1;
door.position.z = 2 + 0.1; //avoid z fighting

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.15, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);

house.add(bush1, bush2, bush3, bush4);

// GRAVES
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

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
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
