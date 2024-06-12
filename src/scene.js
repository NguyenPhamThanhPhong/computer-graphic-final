import * as THREE from 'three';
import { createCamera, createControls } from './camera.js';
import { createRaycaster } from './raycaster.js';
import { createPlane } from './game-objects/plane-ground.js';
import { createCity } from './city.js'
import { createLights } from './lights.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import textures from './textures.js';

const CLEAR_COLOR = 'white'


export function createScene() {
    const gameWindow = document.getElementById('game-window')
    const scene = new THREE.Scene()
    const camera = createCamera();


    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight)

    gameWindow.appendChild(renderer.domElement)


    createPlane(scene);


    let mixer;

    const loader = new RGBELoader();
    let url = '../public/assets/textures/blue-sky.hdr';
    loader.load(url, function (texture) {
        scene.background = texture;
    });


    let city = createCity(90)
    city.initializeCity(scene)

    const { updateSunPosition } = createLights(scene);
    const raycaster = createRaycaster(scene, camera)
    window.raycaster = raycaster

    const controls = createControls(camera, renderer);
    //add mouse down to scene
    renderer.domElement.addEventListener('mousedown', (event) => {
        var rect = renderer.domElement.getBoundingClientRect();
        let mouse = raycaster.mouse
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.onMouseDownSelect()
    })
    renderer.domElement.addEventListener('mousemove', (event) => {
        var rect = renderer.domElement.getBoundingClientRect();
        let mouse = raycaster.mouse
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.onMouseMove()
    });

    const clock = new THREE.Clock();

    // const box = new THREE.Box3();
    // const loader = new GLTFLoader();
    // loader.load('../public/models/commercial/scene.gltf', function (gltf) {
    //     const model = gltf.scene
    //     model.scale.set(0.001, 0.001, 0.001)
    //     box.setFromObject(model);
    //     const helper = new THREE.Box3Helper(box, 0xffff00);
    //     scene.add(helper);
    //     scene.add(model);
    //     // model.position.set(5, 2, 5)

    // });
    // box.setFromCenterAndSize(new THREE.Vector3(1, 1, 1), new THREE.Vector3(2, 1, 3));



    function draw() {
        renderer.render(scene, camera)
        updateSunPosition()
        controls.update();

        const deltaTime = clock.getDelta();
        if (mixer)
            mixer.update(deltaTime);

        Object.values(textures.mixers).forEach((value) => {
            if(value)
                value.update(deltaTime);
        });
        let selectedRenderObj = window.raycaster?.selectedBuildingInstance;
        if (selectedRenderObj){
            let instanceBox = new THREE.Box3().setFromObject(selectedRenderObj)
            let isOverlapped = city.detectOverlap(instanceBox);
            selectedRenderObj.isOverlapped = isOverlapped;
            if(isOverlapped===true){
                if (window.menu?.selectedItem === 'residential' || window.menu?.selectedItem === 'road') {
                    selectedRenderObj.material.forEach(element => {
                        element.emissive.setHex(0x000000);
                    });
                }
                else {
                    selectedRenderObj.traverse((child) => {
                        if (child.isMesh) {
                            child.material.emissive.setHex(0xff0000);
                        }
                    });
                }
            }
            else{
                if(window?.menu?.selectedItem === 'residential' || window?.menu?.selectedItem === 'road'){
                    selectedRenderObj.material.forEach(element => {
                        element.emissive.setHex(0x000000);
                    });
                }
                else
                {
                    selectedRenderObj.traverse((child) => {
                        if (child.isMesh) {
                            child.material.emissive.setHex(0x000000);
                        }
                    });
                }
            }
        }
    }

    function start() {
        renderer.setAnimationLoop(draw)
    }

    function stop() {
        renderer.stopAnimationLoop(null)
    }

    function intervalUpdate() {
        city.stateUpdate()
        city.renderUpdate(scene)
    }



    return {
        city,
        scene,
        intervalUpdate,
        draw,
        start,
        stop
    }
}