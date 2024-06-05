import * as THREE from 'three';

function createPlane(scene) {
    const plane_size = 30

    for (var i = 0; i < plane_size; i++) {
        for (var j = 0; j < plane_size; j++) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
            var cube = new THREE.Mesh(geometry, material);
            let userdata = {buildingId:'ground'}
            cube.position.set(i, -0.5, j);
            cube.receiveShadow = true;
            cube.castShadow = true;
            cube.userData = userdata
            scene.add(cube);
        }
    }
    // var testBox = new THREE.BoxGeometry(1, 1, 1);
    // var testMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    // var testCube = new THREE.Mesh(testBox, testMaterial);
    // testCube.position.set(5, 5, 2);
    // scene.add(testCube);
}
export { createPlane };