import * as THREE from 'three';
import sunTexture from '../public/assets/textures/sun.png';


function createLights(scene) {


        // Create a mesh to represent the sun
    const sunGeometry = new THREE.SphereGeometry( 1, 32, 16 ); 
    const sunMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(sunTexture)  } );
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

    const sun = new THREE.DirectionalLight(0xffffff, 1);
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
    sun.target.position.set(10, 0, 10);
    sun.add(sunMesh)
    scene.add(sun);
    scene.add(sun.target);
    const helper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(helper);





    
    
    // ambientLight.add(sunMesh);
    // scene.add(ambientLight);


    // Rotate the sun to face the light direction
}

export { createLights };