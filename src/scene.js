import * as THREE from 'three';
import { createCamera, createControls } from './camera.js';
import { createRaycaster } from './raycaster.js';
import { createAxis } from './helper-objects/axis.js';
import { createPlane } from './game-objects/plane-ground.js';
import { createCity } from './city.js'
import { createLights } from './lights.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import textures from './textures.js';

const CLEAR_COLOR = 'white'

// let mymodel = loadModelAsync(url).then((model) => {
//     return model;
// });

// let mymodel = await loadModelAsync(url);
// console.log(mymodel);
// let anothermodel = mymodel.clone();
// console.log(anothermodel);
// mymodel.position.set(15, 2, 15);
// anothermodel.position.set(5, 2, 5);

function createCube(w = 1, h = 1, d = 1) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({ color: 'aqua' });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.set(0, 5, 0);
    // cube.position.y = cube.geometry.parameters.height / 2;
    return cube;
}

function createShadowReceiveCube(w = 1, h = 1, d = 1) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({ color: 'aqua' });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(0, 4, 0);
    // cube.position.y = cube.geometry.parameters.height / 2;

    return cube;
}


export function createScene() {
    const gameWindow = document.getElementById('game-window')
    const scene = new THREE.Scene()
    const camera = createCamera();


    const renderer = new THREE.WebGLRenderer()
    // renderer.setClearColor(CLEAR_COLOR);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight)

    gameWindow.appendChild(renderer.domElement)


    createAxis(scene);
    createPlane(scene);
    const cube1 = createCube();
    const box1 = new THREE.Box3();
    box1.setFromObject(cube1);
    const cube2 = createShadowReceiveCube()
    const box2 = new THREE.Box3();
    box2.setFromObject(cube2);
    scene.add(cube1);
    scene.add(cube2);
    if (box1.intersectsBox(box2)) {
        cube1.material.color.set('red');
    }


    let mixer;
    // const loader = new GLTFLoader();
    // loader.load('../public/models/school/scene.gltf', function (gltf) {
    //     const model = gltf.scene
    //     model.scale.set(0.2, 0.2, 0.2)
    //     model.position.set(5, 2, 5)
    //     console.log(model)


    //     // mixer = new THREE.AnimationMixer(model);
    //     // mixer.name = model.uuid;
    //     // const clips = gltf.animations;
    //     // const chosenClip = clips[0];
    //     // const action = mixer.clipAction(chosenClip);
    //     // // action.play();

    //     // model.animate = () => {
    //     //     action.play();
    //     // }
    //     // console.log(typeof (model.animate));
    //     // console.log(model.animate)
    //     // console.log(model)
    //     // console.log(mixer);

    //     model.traverse(function (node) {
    //         if (node.isMesh) {
    //             node.castShadow = true;
    //         }
    //     });
    //     scene.add(model)
    // }, undefined, function (error) {
    //     console.error(error)
    // })


    // scene.add(mymodel);
    // scene.add(anothermodel);

    let city = createCity(30)
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