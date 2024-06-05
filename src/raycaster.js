import * as THREE from 'three';
import {  buildingTypes, createAssetInstance } from './assets.js';

function createRaycaster(scene, camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let selectedObject = undefined

    let selectedBuildingInstance = undefined

    
    function onMouseDownSelect() {

        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children);

        // If there are intersections, fade the first intersected object
        if (intersects.length > 0) {
            if (selectedObject) {
                selectedObject.object.material.emissive?.setHex(0);
            }
            selectedObject = intersects.find((intersect) => intersect.object.userData.buildingId)

            try {
                
            }
            catch (e) {
                console.error(`self error:${e}`)
            }
            let selectedBuildingId = selectedObject?.object.userData.buildingId
            // add building selected to menu
            if (selectedObject && selectedBuildingId && window.menu.selectedItem!=='cursor') {
                let x = selectedObject.object.position.x
                let z = selectedObject.object.position.z

                if (window.menu.selectedItem !== buildingTypes.bulldoze &&
                    selectedBuildingId === buildingTypes.ground) {
                    // console.log(selectedObject.object.position)
                    if (selectedBuildingId === buildingTypes.ground) {
                        window.scene.city.addBuilding(x,z)
                    }
                }
                else if (window.menu.selectedItem === buildingTypes.bulldoze &&
                    selectedBuildingId !== buildingTypes.ground) {
                    window.scene.city.removeBuilding(x, z)
                }
            }
            if (selectedObject) {
                selectedObject.object.material.emissive?.setHex(0xff0000);
            }
        }
    }
    // function onMouseMove(){
    //     let selectedMenuItem = window.menu.selectedItem
    //     if(buildingTypes.includes(selectedMenuItem)){
    //         raycaster.setFromCamera(mouse, camera);

    //         // Calculate objects intersecting the picking ray
    //         var intersects = raycaster.intersectObjects(scene.children);
    //         if (intersects.length > 0){
    //             let hoveredItem = intersects.find((intersect) => intersect.object.userData.buildingId)
    //             let x = hoveredItem.object.position.x
    //             let z = hoveredItem.object.position.z
    //             let selectedBuildingId = hoveredItem?.object.userData.buildingId
    //             if(selectedBuildingId===buildingTypes.ground){
    //                 if(selectedBuildingInstance){
    //                     scene.remove(selectedBuildingInstance)
    //                 }
    //                 selectedBuildingInstance = createAssetInstance(selectedMenuItem, x, z)
    //                 scene.add(selectedBuildingInstance)
    //             }

    //         }
    //         else{

    //         }
    //         // let cube = createAssetInstance(selectedMenuItem, x, z)
    //         // if (cube === undefined) return
    //         // if (selectedObject) {
    //         //     scene.remove(selectedObject.object)
    //         // }
    //         // scene.add(cube)
    //         // selectedObject = {object:cube}
    //     }
    // }

    return {
        raycaster,
        mouse,
        onMouseDownSelect,
        selectedObject,
        selectedBuildingInstance
    }
}

export { createRaycaster }