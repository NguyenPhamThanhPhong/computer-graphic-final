import { buildingTypes } from "./assets.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const gasStationUrl = '../public/models/gas-station/scene.gltf'
const comercialUrl = '../public/models/commercial/scene.gltf'
const smallOfficeUrl = '../public/models/small-office/scene.gltf'
const superMarketUrl = '../public/models/super-market/scene.gltf'
const windmillUrl = '../public/models/windmill/scene.gltf'
const operaUrl = '../public/models/opera-theater/scene.gltf'
const hospital = '../public/models/hospital/scene.gltf'
const park = '../public/models/park/scene.gltf'
const school = '../public/models/school/scene.gltf'
const industrialUrl = '../public/models/jack-pump/scene.gltf'

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader()


function loadTexture(url) {
    const tex = textureLoader.load(url)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(1, 1.8)
    return tex
}

async function loadModelAsync(url) {
    try {
        const gltf = await loader.loadAsync(url);
        const model = gltf.scene;
        model.getBoundingBox = () => {
            let box = new THREE.Box3().setFromObject(model);
            return box;
        }
        return model;
    } catch (error) {
        console.error('An error happened', error);
    }
}

const model_dict = { }



const topMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 })
const sideMaterial = new THREE.MeshLambertMaterial({ map: loadTexture('../public/assets//textures/building1.png') })
const materialArray = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    topMaterial,
    sideMaterial,
    sideMaterial,]
const geometry = new THREE.BoxGeometry(1, 2.5, 1)
let mesh = new THREE.Mesh(geometry, materialArray)
mesh.position.set(10, 2.5 / 2, 10);
mesh.receiveShadow = true;
mesh.castShadow = true;
model_dict[buildingTypes.residential] = mesh;


const height = 0.04
const geometryRoad = new THREE.BoxGeometry(1, height, 1)
const topMaterialRoad = new THREE.MeshLambertMaterial({ map: loadTexture('../public/assets/textures/road.jpg') })
const sideMaterialRoad = new THREE.MeshLambertMaterial({ color: 0x555555 })
const materialArrayRoad = [
    sideMaterialRoad,
    sideMaterialRoad,
    topMaterialRoad,
    topMaterialRoad,
    sideMaterialRoad,
    sideMaterialRoad,]
const cube = new THREE.Mesh(geometryRoad, materialArrayRoad)
cube.position.set(10, height / 2, 10)
model_dict[buildingTypes.road] = cube;

loadModelAsync(gasStationUrl).then((model) => {
    model_dict[buildingTypes.gas_station] = model;
    model.scale.set(0.3, 0.3, 0.3)
    model.position.setZ(0.3)
});
loadModelAsync(comercialUrl).then((model) => {
    model_dict[buildingTypes.commercial] = model;
    model.scale.set(0.001, 0.001, 0.001)
    model.position.setY(1)
});
loadModelAsync(smallOfficeUrl).then((model) => {
    model_dict[buildingTypes.office] = model;
    model.scale.set(0.0008, 0.0008, 0.0008)
    model.position.setY(0)
});
loadModelAsync(superMarketUrl).then((model) => {
    model_dict[buildingTypes.super_market] = model;
    model.scale.set(0.2, 0.2, 0.2)
    model.position.setY(0.3)
});
loadModelAsync(windmillUrl).then((model) => {
    model_dict[buildingTypes.windmill] = model;
    model.scale.set(0.2, 0.2, 0.2)
    model.position.setY(-0.5)
});
loadModelAsync(operaUrl).then((model) => {
    model_dict[buildingTypes.opera] = model;
});
loadModelAsync(hospital).then((model) => {
    model_dict[buildingTypes.hospital] = model;
    model.scale.set(0.2, 0.2, 0.2)
});
loadModelAsync(park).then((model) => {
    model_dict[buildingTypes.park] = model;
    model.scale.set(1, 1, 1)
    model.position.setY(0.3)
});
loadModelAsync(school).then((model) => {
    model_dict[buildingTypes.school] = model;
    model.scale.set(0.2, 0.2, 0.2)
    model.position.setY(0.4)
});
loadModelAsync(industrialUrl).then((model) => {
    model_dict[buildingTypes.industrial] = model;
    model.scale.set(1, 1, 1)
    model.position.setY(0)
});

export { model_dict}