import * as THREE from 'three';
import { camera_constants } from './constants.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let cameraX = camera_constants.x;
let cameraY = camera_constants.y;
let cameraZ = camera_constants.z;
// let boundary = constants.cameraBoundary;
function createCamera() {
    // Define camera properties
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    // Create a PerspectiveCamera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(cameraX, cameraY, cameraZ);
    return camera;
}

function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = camera_constants.minDistance;
    controls.maxDistance = camera_constants.maxDistance;
    return controls;
}

// function onMouseDown() {
//     console.log('mouse down')
// }
// function onMouseMove() {
//     console.log('mouse move')
// }
// function onMouseUp() {
//     console.log('mouse up')
// }

export { createCamera,createControls };