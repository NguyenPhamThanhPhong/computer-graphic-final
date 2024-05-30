import * as THREE from 'three';
// import building0 from '../public/assets/textures/building0.jpg'
import textures from './textures.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { mod } from 'three/addons/nodes/Nodes.js';

const textureLoader = new THREE.TextureLoader()

let buildingStateTypes = {
    ground: 'ground',
    state_0: 'building-0',
    state_1: 'building-1',
    state_2: 'building-2',
    state_3: 'building-3',
    state_no_update: 'building-4',
    residential: 'residential',
    comercial: 'comercial',
    industrial: 'industrial',
    bulldoze: 'bulldoze',
    road: 'road',
    includes: (state) =>
        // check undefined or null first
        state ?? Object.values(buildingStateTypes).includes(state)
}

let buildingStates = {
    [buildingStateTypes.state_0]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    }, // 'house
    [buildingStateTypes.state_1]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingStateTypes.state_2]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingStateTypes.state_3]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingStateTypes.state_no_update]: {
        buildingId: 'building-0',
        terrainId: 'grass',
        stateMessage: 'building at max level'
    },
    [buildingStateTypes.residential]: {
        buildingId: 'residential',
        terrainId: 'grass',
    },
    [buildingStateTypes.comercial]: {
        buildingId: 'comercial',
        terrainId: 'grass',
    },
    [buildingStateTypes.industrial]: {
        buildingId: 'industrial',
        terrainId: 'grass',
    },
    [buildingStateTypes.road]: {
        buildingId: 'road',
        terrainId: 'grass',
    },
}


function loadTexture(url) {
    const tex = textureLoader.load(url)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(1, 1.8)
    return tex
}

function createMeshTexture(x, y, data) {

    const topMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 })
    const sideMaterial = new THREE.MeshLambertMaterial({ map: loadTexture(data.textureData) })
    const materialArray = [
        sideMaterial,
        sideMaterial,
        topMaterial,
        topMaterial,
        sideMaterial,
        sideMaterial,]
    const geometry = new THREE.BoxGeometry(1, data.height, 1)
    let mesh = new THREE.Mesh(geometry, materialArray)
    mesh.userData = data.userData;
    mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8)
    mesh.position.set(x, (data.height - 0.95) / 2, y);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
}

function createDataObject(textureData, height, userData) {
    return {
        textureData: textureData,
        height: height,
        userData: userData
    }
}

const ModelLoader = new GLTFLoader()

const assets = {
    'building-0': (x, y) => {
        const height = 0.5
        
        const my_data = createDataObject(textures.building0, 1, buildingStates[buildingStateTypes.state_0])
        const cube = createMeshTexture(x, y, my_data)
        // const userdata = buildingStates[buildingStateTypes.state_0]
        // cube.userData = userdata
        cube.position.set(x, height / 2, y)
        return cube
    },
    'building-1': (x, y) => {
        const height = 1
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingStateTypes.state_1])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'building-2': (x, y) => {
        const height = 2
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingStateTypes.state_2])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'building-3': (x, y) => {
        const height = 2.5
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingStateTypes.state_3])
        const cube = createMeshTexture(x, y, my_data)
        // const userdata = buildingStates[buildingStateTypes.state_3]
        // cube.userData = userdata
        // cube.position.set(x, height / 2, y)
        return cube
    },
    'residential': (x, y) => {
        const height = 0.5
        // const geometry = new THREE.BoxGeometry(1, height, 1)
        // const material = new THREE.MeshLambertMaterial({ color: 0x080808 })
        const my_data = createDataObject(textures.building0, 1, buildingStates[buildingStateTypes.residential])
        const cube = createMeshTexture(x, y, my_data)
        // const userData = buildingStates[buildingStateTypes.residential]
        // cube.userData = userData
        cube.position.set(x, height / 2, y)
        return cube
    },
    'commercial': (x, y) => {
        //0eeb49
        const height = 7
        let model;
        ModelLoader.load(textures.residential_model, (gltf) => {
            model = gltf.scene;
            console.log(model)

            model.scale.set(1,1,1);
            model.position.set(x, height / 2, y);
            model.userData = buildingStates[buildingStateTypes.comercial]
        })

        return model
    },
    'industrial': (x, y) => {
        //0eeb49
        const height = 4
        const geometry = new THREE.BoxGeometry(1, height, 1)
        const material = new THREE.MeshLambertMaterial({ color: 0xc802f5 })
        const cube = new THREE.Mesh(geometry, material)
        const userData = buildingStates[buildingStateTypes.residential]
        cube.userData = userData
        cube.position.set(x, height / 2, y)
        return cube
    },
    'road': (x, y) => {
        //0eeb49
        const height = 0.1
        const geometry = new THREE.BoxGeometry(1, height, 1)
        const material = new THREE.MeshLambertMaterial({ color: 0x000000 })
        const cube = new THREE.Mesh(geometry, material)
        const userData = buildingStates[buildingStateTypes.residential]
        cube.userData = userData
        cube.position.set(x, height / 2, y)
        return cube
    },
    'bulldoze': (x, y) => {
        return undefined
    }

}

function createAssetInstance(assetId, x, y) {
    if (!assets[assetId]) {
        console.warn(`No asset with id ${assetId}`)
        return undefined
    }
    return assets[assetId](x, y)
}

export { createAssetInstance, buildingStateTypes }