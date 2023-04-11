// import { useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Name3D from "../assets/scene.glb";

/**
 * SCENE
 */
const scene = new THREE.Scene();

/**
 * CAMERA
 */
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

/**
 * LIGHTS
 */
// const light = new THREE.SpotLight();
// light.position.set(2, 2, 10);
// scene.add(light);

const ambient_light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambient_light);

/**
 * RENDERER
 */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * WINDOWS RESIZE ADJUSTMENT
 */
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

/**
 * ORBIT CONTROLS
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enablePan = false;
controls.enableDamping = true;

//the camera rotation pivot
let orbit = new THREE.Object3D();
orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
orbit.position.copy(scene.position);
scene.add(orbit);

renderer.domElement.addEventListener("mousemove", function (e) {
  let scale = -0.0005;
  orbit.rotateY(e.movementX * scale);
  orbit.rotateX(e.movementY * scale);
  orbit.rotation.z = 0; //this is important to keep the camera level..
});

//offset the camera and add it to the pivot
//you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
let cameraDistance = 10;
camera.position.z = cameraDistance;
orbit.add(camera);

/**
 * GLTF MODEL LOADER
 */
const loader = new GLTFLoader();
loader.load(
  Name3D,
  function (gltf) {
    scene.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

/**
 * ANIMATE CONTROLS AND RENDER
 */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
  // stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
// renderer.render(scene, camera);
