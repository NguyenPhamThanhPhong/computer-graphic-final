import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const building0 = '../public/assets//textures/building1.png'
const building1 = '../public/assets//textures/building1.png'
const sun = '../public/assets/textures/sun.png'
const moon = '../public/assets/textures/moon.jpg'
const comercial3 = '../public/assets/textures/comercial3.png'
const comercial1 = '../public/assets/textures/comercial1.png'
const road = '../public/assets/textures/road.jpg'

const loader = new GLTFLoader();


// let url = '../public/models/gas-station/scene.gltf';
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

async function loadModelAsync(url) {
    try {
        const gltf = await loader.loadAsync(url);
        const model = gltf.scene;
        // model.scale.set(0.3, 0.3, 0.3)
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                // child.receiveShadow = true;
            }
        });
        if (gltf.animations.length > 0) {
            const clips = gltf.animations;
            model.animations = clips;

        }
        return model; // Return the loaded model
    } catch (error) {
        console.error('An error happened', error);
    }
}

const textures ={
    building0: building0,
    building1: building1,
    sun: sun,
    moon: moon,
    road: road,
    comercial3: comercial3,
    comercial1: comercial1,
    // residential_model: undefined,
    industrial_model: undefined,
    gas_station_model: undefined,
    comercial_model: undefined,
    small_office_model: undefined,
    super_market_model: undefined,
    windmill_model: undefined,
    opera_model: undefined,
    hospital_model: undefined,
    school_model: undefined,
    park_model: undefined,
    mixers: {},
}



loadModelAsync(gasStationUrl).then((model) => {
    textures.gas_station_model = model;
    console.log('gas_station_model loaded');
});
loadModelAsync(comercialUrl).then((model) => {
    textures.comercial_model = model;
    console.log('residential_model loaded');
});
loadModelAsync(smallOfficeUrl).then((model) => {
    textures.small_office_model = model;
    console.log('small_office_model loaded');
});
loadModelAsync(superMarketUrl).then((model) => {
    textures.super_market_model = model;
    console.log('small_office_model loaded');
});
loadModelAsync(windmillUrl).then((model) => {
    textures.windmill_model = model;
    console.log('windmill_model loaded');
});
loadModelAsync(operaUrl).then((model) => {
    textures.opera_model = model;
    console.log('opera_model loaded');
});
loadModelAsync(hospital).then((model) => {
    textures.hospital_model = model;
    console.log('hospital_model loaded');
});
loadModelAsync(park).then((model) => {
    textures.park_model = model;
    console.log('park_model loaded');
});
loadModelAsync(school).then((model) => {
    textures.school_model = model;
    console.log('school_model loaded');
});
loadModelAsync(industrialUrl).then((model) => {
    textures.industrial_model = model;
    console.log('industrial_model loaded');
});


// console.log(textures)

export default textures;