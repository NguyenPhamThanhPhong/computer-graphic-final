import * as THREE from 'three';
// import building0 from '../public/assets/textures/building0.jpg'
import textures from './textures.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
// import { mod } from 'three/addons/nodes/Nodes.js';

const textureLoader = new THREE.TextureLoader()

let buildingTypes = {
    ground: 'ground',
    state_0: 'building-0',
    state_1: 'building-1',
    state_2: 'building-2',
    state_3: 'residential',
    state_no_update: 'building-4',
    residential: 'residential',
    comercial: 'comercial',
    industrial: 'industrial',
    hospital: 'hospital',
    school: 'school',
    park: 'park',
    office: 'office',
    super_market: 'super-market',
    windmill: 'windmill',
    opera: 'opera',
    bulldoze: 'bulldoze',
    road: 'road',
    gas_station: 'gas-station',
    includes: (state) =>
        // check undefined or null first
        state ?? Object.values(buildingTypes).includes(state)
}

let buildingStates = {
    [buildingTypes.state_0]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    }, // 'house
    [buildingTypes.state_1]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingTypes.state_2]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingTypes.state_3]: {
        buildingId: 'building-0',
        terrainId: 'grass',
    },
    [buildingTypes.state_no_update]: {
        buildingId: 'residential',
        terrainId: 'grass',
        stateMessage: 'building at max level'
    },
    [buildingTypes.residential]: {
        buildingId: 'residential',
        terrainId: 'grass',
    },
    [buildingTypes.comercial]: {
        buildingId: 'comercial',
        terrainId: 'grass',
    },
    [buildingTypes.industrial]: {
        buildingId: 'industrial',
        terrainId: 'grass',
    },
    [buildingTypes.hospital]: {
        buildingId: 'hospital',
    },
    [buildingTypes.school]: {
        buildingId: 'school',
    },
    [buildingTypes.park]: {
        buildingId: 'park',
    },
    [buildingTypes.office]: {
        buildingId: 'office',
    },
    [buildingTypes.super_market]: {
        buildingId: 'super-market',
    },
    [buildingTypes.road]: {
        buildingId: 'road',
        terrainId: 'grass',
    },
    [buildingTypes.gas_station]: {
        buildingId: 'gas-station',
        terrainId: 'grass',
        isUpdateable: false,
    },
    [buildingTypes.windmill]: {
        buildingId: 'windmill',
        terrainId: 'grass',
    }
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
        const my_data = createDataObject(textures.building0, 1, buildingStates[buildingTypes.state_0])
        const cube = createMeshTexture(x, y, my_data)

        cube.position.set(x, height / 2, y)
        return cube
    },
    'building-1': (x, y) => {
        const height = 1
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingTypes.state_1])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'building-2': (x, y) => {
        const height = 2
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingTypes.state_2])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'building-3': (x, y) => {
        const height = 2.5
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingTypes.state_3])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'residential': (x, y) => {
        const height = 2.5
        const my_data = createDataObject(textures.comercial1, height, buildingStates[buildingTypes.residential])
        const cube = createMeshTexture(x, y, my_data)
        return cube
    },
    'commercial': (x, y) => {
        const model = textures.comercial_model.clone()
        model.scale.set(0.001, 0.001, 0.001)
        model.position.set(x, 2, y)
        model.userData = buildingStates[buildingTypes.comercial]
        return model
    },
    'hospital': (x, y) => {
        const model = textures.hospital_model.clone()
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(x, 0, y)
        model.userData = buildingStates[buildingTypes.hospital]
        return model
    },
    'super-market': (x, y) => {
        const model = textures.super_market_model.clone()
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(x, 0.3, y)
        model.userData = buildingStates[buildingTypes.super_market]
        return model
    },
    'school': (x, y) => {
        const model = SkeletonUtils.clone(textures.school_model)
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(x, 0.4, y)
        model.userData = buildingStates[buildingTypes.school]
        return model
    },
    'park': (x, y) => {
        const model = textures.park_model.clone()
        model.scale.set(1, 1, 1)
        model.position.set(x, 0, y)
        model.userData = buildingStates[buildingTypes.park]
        return model
    },
    'office': (x, y) => {
        const model = textures.small_office_model.clone()
        model.scale.set(0.0008, 0.0008, 0.0008)
        model.position.set(x, 0, y)
        model.userData = buildingStates[buildingTypes.office]
        return model
    },
    'industrial': (x, y) => {
        const industrial_model = textures.industrial_model
        const model = SkeletonUtils.clone(industrial_model)
        model.scale.set(0.01, 0.01, 0.01)
        model.position.set(x, 0, y)
        model.animations = [...industrial_model.animations]

        const mixer = new THREE.AnimationMixer(model)
        mixer.name = model.uuid;
        const clips = model.animations;
        const chosenClip = clips[0];
        const action = mixer.clipAction(chosenClip);
        action.play();
        textures.mixers[mixer.name] = mixer;

        model.userData = buildingStates[buildingTypes.industrial]
        return model
    },
    'windmill': (x, y) => {
        const windmill_model = textures.windmill_model
        const model = SkeletonUtils.clone(windmill_model)
        model.scale.set(0.2, 0.2, 0.2)
        model.position.set(x, -0.5, y)
        model.animations = [...windmill_model.animations]

        const mixer = new THREE.AnimationMixer(model)
        mixer.name = model.uuid;
        const clips = model.animations;
        const chosenClip = clips[0];
        const action = mixer.clipAction(chosenClip);
        action.play();
        textures.mixers[mixer.name] = mixer;

        model.userData = buildingStates[buildingTypes.windmill]
        return model
    },
    'road': (x, y) => {
        //0eeb49
        const height = 0.04
        const geometry = new THREE.BoxGeometry(1, height, 1)
        const material = new THREE.MeshLambertMaterial({ color: 0x000000 })
        const cube = new THREE.Mesh(geometry, material)
        const userData = buildingStates[buildingTypes.road]
        cube.userData = userData
        cube.position.set(x, height / 2, y)
        return cube
    },
    'gas-station': (x, y) => {
        const model = textures.gas_station_model.clone()
        model.scale.set(0.3, 0.3, 0.3)
        model.position.set(x, 0.3, y)
        model.userData = buildingStates[buildingTypes.gas_station]
        return model
    },
    'bulldoze': (x, y) => {
        return undefined
    }
}

function createAssetInstance(assetId, x, y) {
    console.log(`createAssetInstance:${assetId}`)
    if (!assets[assetId]) {
        console.warn(`No asset with id ${assetId}`)
        return undefined
    }
    return assets[assetId](x, y)
}

export { createAssetInstance, buildingTypes }