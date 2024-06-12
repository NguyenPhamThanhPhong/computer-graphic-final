import * as THREE from 'three';
import { buildingTypes, createAssetInstance } from './assets.js';

let info_table = document.getElementById('info-overlay-details');

function createRaycaster(scene, camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let selectedObject = undefined

    let hoveredInstance = undefined


    function onMouseDownSelect() {

        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children);

        // If there are intersections, fade the first intersected object
        if (intersects.length > 0) {
            if (selectedObject) {
                selectedObject.object.material.emissive?.setHex(0);
            }
            if (hoveredInstance !== undefined) {
                if (window.menu.selectedItem === buildingTypes.bulldoze) {
                    window.scene.city.removeBuilding(hoveredInstance.position.x, hoveredInstance.position.z)
                }
                else{
                    let htmlStr = `Building name: ${hoveredInstance.userData.buildingId}`
                    htmlStr += `<br>Position: (${hoveredInstance.position.x}, ${hoveredInstance.position.z})`
                    htmlStr += `<br>Description: ${hoveredInstance.userData.description}`
                    info_table.innerHTML = htmlStr
                }
            }
            selectedObject = intersects.find((intersect) => intersect.object.userData.buildingId)

            try {

            }
            catch (e) {
                console.error(`self error:${e}`)
            }
            let selectedBuildingId = selectedObject?.object.userData.buildingId
            // add building selected to menu
            if (selectedObject && selectedBuildingId && window.menu.selectedItem !== 'cursor') {
                let x = selectedObject.object.position.x
                let z = selectedObject.object.position.z
                if (window.menu.selectedItem !== buildingTypes.bulldoze &&
                    selectedBuildingId === buildingTypes.ground) {
                    // console.log(selectedObject.object.position)
                    if (selectedBuildingId === buildingTypes.ground) {
                        if (window.raycaster?.selectedBuildingInstance?.isOverlapped === false) {
                            window.scene.city.addBuilding(x, z)
                        }
                    }
                }

            }
            if (selectedObject) {
                selectedObject.object.material.emissive?.setHex(0xff0000);
            }
        }
    }
    function onMouseMove() {
        let selectedMenuItem = window.menu.selectedItem
        if (buildingTypes.includes(selectedMenuItem)) {
            raycaster.setFromCamera(mouse, camera);

            // Calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                if (window.menu.selectedItem === buildingTypes.bulldoze || 
                    window.menu.selectedItem === 'cursor') {
                    let buildingId = hoveredInstance?.userData?.buildingId
                    if (hoveredInstance) {
                        if (buildingId === buildingTypes.road
                            || buildingId === buildingTypes.residential
                        ) {
                            hoveredInstance.material.forEach(element => {
                                element.emissive.setHex(0x000000);
                            });
                        }
                        else {
                            hoveredInstance.traverse((child) => {
                                if (child.isMesh) {
                                    child.material.emissive?.setHex(0)
                                }
                            });
                        }
                    }

                    let hoveredItem = intersects.find((intersect) =>
                        intersect.object.userData?.buildingId === buildingTypes.road
                        || intersect.object.userData?.buildingId === buildingTypes.residential
                        || intersect.object.root !== undefined)
                    if (hoveredItem?.object.root) {
                        hoveredInstance = hoveredItem.object.root
                    }
                    else if (hoveredItem?.object.userData?.buildingId === buildingTypes.road
                        || hoveredItem?.object.userData?.buildingId === buildingTypes.residential
                    ) {
                        hoveredInstance = hoveredItem.object
                    }
                    else {
                        if (hoveredInstance) {
                            if (buildingId === buildingTypes.road
                                || buildingId === buildingTypes.residential
                            ) {
                                hoveredInstance.material.forEach(element => {
                                    element.emissive.setHex(0x000000);
                                });
                            }
                            else {
                                hoveredInstance.traverse((child) => {
                                    if (child.isMesh) {
                                        child.material.emissive?.setHex(0)
                                    }
                                });
                            }
                        }
                        hoveredInstance = undefined
                    }
                    if (hoveredInstance) {
                        if (buildingId === buildingTypes.road
                            || buildingId === buildingTypes.residential
                        ) {
                            hoveredInstance.material.forEach(element => {
                                element.emissive.setHex(0xff0000);
                            });
                        }
                        else {
                            hoveredInstance.traverse((child) => {
                                if (child.isMesh) {
                                    child.material.emissive?.setHex(0xff0000)
                                }
                            });
                        }
                    }

                }
                else {
                    let hoveredItem = intersects.find((intersect) =>
                        intersect.object.userData.buildingId === buildingTypes.ground)
                    if (hoveredItem?.object.userData.buildingId === buildingTypes.ground) {
                        // console.log(hoveredItem.object.position)
                        hoveredInstance = undefined
                        let x = hoveredItem.object.position.x
                        let z = hoveredItem.object.position.z
                        // let selectedBuildingId = hoveredItem?.object.userData.buildingId
                        if (window.raycaster.selectedBuildingInstance) {
                            window.raycaster.selectedBuildingInstance.position.setX(x)
                            window.raycaster.selectedBuildingInstance.position.setZ(z)
                        }
                    }
                }

            }
            // let cube = createAssetInstance(selectedMenuItem, x, z)
            // if (cube === undefined) return
            // if (selectedObject) {
            //     scene.remove(selectedObject.object)
            // }
            // scene.add(cube)
            // selectedObject = {object:cube}
        }
    }

    return {
        raycaster,
        mouse,
        onMouseDownSelect,
        onMouseMove,
        selectedObject
    }
}

export { createRaycaster }