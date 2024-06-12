import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader()
function loadTexture(url) {
    const tex = textureLoader.load(url)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(1, 1.8)
    return tex
}

function createPlane(scene) {
    const plane_size = 30

    for (var i = 0; i < plane_size; i++) {
        for (var j = 0; j < plane_size; j++) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshStandardMaterial({ map: loadTexture('../../public/assets/textures/grass.jpg') });
            var cube = new THREE.Mesh(geometry, material);
            let userdata = {buildingId:'ground'}
            cube.position.set(i, -0.5, j);
            cube.receiveShadow = true;
            cube.castShadow = true;
            cube.userData = userdata
            scene.add(cube);
        }
    }

}
export { createPlane };