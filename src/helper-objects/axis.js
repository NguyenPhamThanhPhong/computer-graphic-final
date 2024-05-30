import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
const grid_size = 100
function createAxis(scene) {
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(grid_size, grid_size);
    scene.add(gridHelper);
    // Add axis names
    const axisNames = ['x', 'y', 'z'];
    const axisColors = [0xff0000, 0x00ff00, 0x0000ff];
    // map names
    axisNames.forEach((axisName, index) => {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            const textGeometry = new TextGeometry(axisName, {
                font: font,
                size: 1,
                depth: 0.05,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: axisColors[index] });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Position the textMesh according to the axis
            switch (axisName) {
                case 'x':
                    textMesh.position.set(0, 0, 0);
                    textMesh.rotateZ(Math.PI / 2);
                    break;
                case 'y':
                    textMesh.position.set(0, 50, 0);
                    textMesh.rotateX(Math.PI / 2);
                    break;
                case 'z':
                    textMesh.position.set(0, 0, 0);
                    textMesh.rotateY(Math.PI / 2);
                    break;
            }
            // textMesh.rotateX(Math.PI / 2);

            scene.add(textMesh);
        });
    });
}

export {createAxis}