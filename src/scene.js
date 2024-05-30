import * as THREE from 'three';
import { createCamera, createControls } from './camera.js';
import { createRaycaster } from './raycaster.js';
import { createAxis } from './helper-objects/axis.js';
import { createPlane } from './game-objects/plane-ground.js';
import { createCity } from './city.js'
import { createLights } from './lights.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CLEAR_COLOR = 'white'





function createCube(w=1,h=1,d=1) {
    const geometry = new THREE.BoxGeometry(w,h,d);
    const material = new THREE.MeshPhongMaterial({ color: 'aqua' });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.set(0,5,0);
    // cube.position.y = cube.geometry.parameters.height / 2;
    return cube;
}

function createShadowReceiveCube(w=1,h=1,d=1) {
    const geometry = new THREE.BoxGeometry(w,h,d);
    const material = new THREE.MeshPhongMaterial({ color: 'aqua' });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(0,4,0);
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
    scene.add(createCube());
    scene.add(createShadowReceiveCube());

    const loader = new GLTFLoader();
    loader.load('../public/models/gas-station/scene.gltf', function (gltf) {
        const model = gltf.scene
        model.scale.set(0.3, 0.3, 0.3)
        model.position.set(5, 2, 5)
        
        model.traverse(function(node){
            if (node.isMesh) {
                node.castShadow = true;
                // node.receiveShadow = true;
            }
        });

        console.log(gltf)
        scene.add(model)

    }, undefined, function (error) {
        console.error(error)
    })
    
    let city = createCity(30)
    city.initializeCity(scene)

    const { updateSunPosition } = createLights(scene);
    const raycaster = createRaycaster(scene, camera)

    const controls = createControls(camera, renderer);
    //add mouse down to scene
    renderer.domElement.addEventListener('mousedown', (event) => {
        var rect = renderer.domElement.getBoundingClientRect();
        let mouse = raycaster.mouse
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.onMouseDownSelect()
    })

    function draw() {
        renderer.render(scene, camera)
        updateSunPosition()
        controls.update();
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
        intervalUpdate,
        draw,
        start,
        stop
    }
}