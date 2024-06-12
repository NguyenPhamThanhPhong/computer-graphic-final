import { createAssetInstance } from "./assets.js";
import { model_dict } from "./textures-selection.js";
import * as THREE from 'three';

const GLOBAL_SELECTED_OBJ_NAME = 'GLOBAL_SELECTED_OBJECT';

function menuItemMouseDown(button) {
    button.style.backgroundColor = "#FF0000";
}
const areaPointsCalculator = {
    'residential': (x, y) => {
        return [{ x: x, y: y }];
    },
    'road': (x, y) => {
        return [{ x: x, y: y }];
    },
    'commercial': (x, y) => {
        const point1 = { x: x, y: y };
        const point2 = { x: x + 1, y: y };
        const point3 = { x: x, y: y + 1 };
        const point4 = { x: x + 1, y: y + 1 };
        return [point1, point2, point3, point4];
    },
    'industrial': (x, y) => {
        //totally 9 points around the center 3x3
        const point1 = { x: x, y: y };
        const point5 = { x: x - 1, y: y - 1 };
        const point2 = { x: x, y: y - 1 };
        const point3 = { x: x + 1, y: y - 1 };
        const point4 = { x: x - 1, y: y };
        const point6 = { x: x + 1, y: y };
        const point7 = { x: x - 1, y: y + 1 };
        const point8 = { x: x, y: y + 1 };
        const point9 = { x: x + 1, y: y + 1 };
        return [point1, point2, point3, point4, point5, point6, point7, point8, point9];
    }
}

class Menu {
    constructor() {
        this.selectedItem = 'cursor'
    }

    getSelectedAreaPoints(x, y) {
        console.log(`selectedItem asdfasdfasd:${this.selectedItem}`)
        if (this.selectedItem === 'bulldoze') {
            return [{ x, y }];
        }
        if (!areaPointsCalculator[this.selectedItem])
            return undefined
        return areaPointsCalculator[this.selectedItem](x, y);
    }

    createMenuItemEvents() {
        const cursor = document.getElementById('button-cursor');
        const bulldoze = document.getElementById('button-bulldoze');
        const residential = document.getElementById('button-residential');
        const commercial = document.getElementById('button-commercial');
        const industrial = document.getElementById('button-industrial');
        const road = document.getElementById('button-road');
        const office = document.getElementById('button-office');
        const park = document.getElementById('button-park');
        const school = document.getElementById('button-school');
        const hospital = document.getElementById('button-hospital');
        const superMarket = document.getElementById('button-super-market');
        const gasStation = document.getElementById('button-gas-station');
        const windmill = document.getElementById('button-windmill');

        let selectedControl = bulldoze;

        // make this function a method of the class
        const handleMenuItem = (event, toolId) => {

            if (window.raycaster.selectedBuildingInstance) {

                if (window?.scene?.scene) {
                    let scene = window.scene.scene;
                    let global_selected_object = scene.getObjectByName(GLOBAL_SELECTED_OBJ_NAME)
                    if (global_selected_object) {
                        scene.remove(global_selected_object);
                        window.raycaster.selectedBuildingInstance = undefined;
                    }
                }
            }
            if (toolId !== 'cursor' && toolId !== 'bulldoze') {
                let selectedRenderObj = model_dict[toolId];
                if (selectedRenderObj) {
                    selectedRenderObj.name = GLOBAL_SELECTED_OBJ_NAME;
                    if (toolId == 'residential' || toolId==='road') {
                        selectedRenderObj.material.transparent = true;
                        selectedRenderObj.material.opacity = 0.5;
                    }
                    else {
                        selectedRenderObj.traverse((child) => {
                            if (child.isMesh) {
                                // child.material.emissive.setHex(0xff0000);
                                // console.log(child);
                                child.material.transparent = true;
                                child.material.opacity = 0.6;
                            }
                        });
                    }
                    // console.log(selectedRenderObj);
                    window.raycaster.selectedBuildingInstance = selectedRenderObj;
                    // console.log(window.scene.scene);
                    window.scene.scene.add(selectedRenderObj);
                }
            }

            if (selectedControl) {
                selectedControl.classList.remove('selected');
            }
            selectedControl = event.target;
            selectedControl.classList.add('selected');
            this.selectedItem = toolId;
        }
        cursor.addEventListener('mousedown', (event) => handleMenuItem(event, 'cursor'));
        bulldoze.addEventListener('mousedown', (event) => handleMenuItem(event, 'bulldoze'));
        residential.addEventListener('mousedown', (event) => handleMenuItem(event, 'residential'));
        commercial.addEventListener('mousedown', (event) => handleMenuItem(event, 'commercial'));
        industrial.addEventListener('mousedown', (event) => handleMenuItem(event, 'industrial'));
        road.addEventListener('mousedown', (event) => handleMenuItem(event, 'road'));
        office.addEventListener('mousedown', (event) => handleMenuItem(event, 'office'));
        park.addEventListener('mousedown', (event) => handleMenuItem(event, 'park'));
        school.addEventListener('mousedown', (event) => handleMenuItem(event, 'school'));
        hospital.addEventListener('mousedown', (event) => handleMenuItem(event, 'hospital'));
        superMarket.addEventListener('mousedown', (event) => handleMenuItem(event, 'super-market'));
        gasStation.addEventListener('mousedown', (event) => handleMenuItem(event, 'gas-station'));
        windmill.addEventListener('mousedown', (event) => handleMenuItem(event, 'windmill'));
    }
}


export { Menu };