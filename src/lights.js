import * as THREE from 'three';
import textures from './textures.js';
// import sunTexture from '../public/assets/textures/sun.png';


function createLights(scene) {
    const rotatePos = [10, 0, 10]


        // Create a mesh to represent the sun
    const sunGeometry = new THREE.SphereGeometry( 1, 32, 16 ); 
    const sunMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(textures.sun)  } );
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(20, 20, 20);
    sun.castShadow = true;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.add(sunMesh)
    // scene.add(sun);

    const moonGeometry = new THREE.SphereGeometry(1, 32, 16);
    const moonMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(textures.moon) });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    const moon = new THREE.DirectionalLight(0xffffff, 0.5);
    moon.position.set(-10, -20, -10);
    moon.castShadow = true;
    moon.shadow.camera.left = -20;
    moon.shadow.camera.right = 20;
    moon.shadow.camera.top = 20;
    moon.shadow.camera.bottom = -20;
    moon.shadow.mapSize.width = 1024;
    moon.shadow.mapSize.height = 1024;
    moon.shadow.camera.near = 0.5;
    moon.shadow.camera.far = 50;
    moon.add(moonMesh);


    const virtualCenter = new THREE.Object3D();
    sun.target.position.set(...rotatePos);
    moon.target.position.set(...rotatePos);
    virtualCenter.position.set(...rotatePos);
    virtualCenter.add(sun);
    virtualCenter.add(moon);
    scene.add(virtualCenter);
    scene.add(sun.target);
    scene.add(moon.target);

    // const helper = new THREE.CameraHelper(sun.shadow.camera);
    // scene.add(helper);

    // const moonHelper = new THREE.CameraHelper(moon.shadow.camera);
    // scene.add(moonHelper);


    function updateSunPosition() {
        virtualCenter.rotateZ(0.005);
    }
    return { updateSunPosition };
}

export { createLights };