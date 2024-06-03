import * as THREE from 'three';
import { buildingStateTypes, createAssetInstance } from './assets.js';

function createRaycaster(scene, camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let selectedObject = undefined
    function onMouseDownSelect() {

        // Update the picking ray with the camera and mouse position
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
            if (selectedObject && selectedBuildingId) {
                let x = selectedObject.object.position.x
                let z = selectedObject.object.position.z

                if (window.menu.selectedItem !== buildingStateTypes.bulldoze &&
                    selectedBuildingId === buildingStateTypes.ground) {
                    // console.log(selectedObject.object.position)
                    if (selectedBuildingId === buildingStateTypes.ground) {
                        let pointArgs = window.menu.getSelectedAreaPoints(x, z)
                        if(pointArgs)
                            window.scene.city.addBuilding(pointArgs)
                    }
                }
                else if (window.menu.selectedItem === buildingStateTypes.bulldoze &&
                    selectedBuildingId !== buildingStateTypes.ground) {
                    window.scene.city.removeBuilding(x, z)
                }
            }
            if (selectedObject) {
                selectedObject.object.material.emissive?.setHex(0xff0000);
            }
        }
    }
    return {
        raycaster,
        mouse,
        onMouseDownSelect,
        selectedObject,
    }
}

export { createRaycaster }