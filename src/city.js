import * as THREE from 'three';
import { createAssetInstance, buildingStateTypes } from './assets';

class BuildingObject {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.areaPoints = [{x,y}]

        this.isRemoved = false
        if (Math.random() > 0.9)
            this.building = buildingStateTypes.state_0
    }
    static initializeNewBuilding = (x, y, state) => {
        let mybuild = new BuildingObject(x, y)
        mybuild.building = state
        return mybuild
    }
    update() {
        //check if it's in building state types
        switch (this.building) {
            case buildingStateTypes.state_0:
                this.building = buildingStateTypes.state_1
                break;
            case buildingStateTypes.state_1:
                this.building = buildingStateTypes.state_2
                break;
            case buildingStateTypes.state_2:
                this.building = buildingStateTypes.state_3
                break;
            case buildingStateTypes.state_3:
                this.building = buildingStateTypes.state_4
                break;
            default:
                return;
        }
    }
}

function createCity(size) {
    const data = []
    let buildingCubes = []

    function initializeCity() {
        for (let x = 0; x < size; x++) {
            const columns = []
            for (let y = 0; y < size; y++) {
                const tile = new BuildingObject(x, y)
                columns.push(tile)
            }
            data.push(columns)
        }
        buildingCubes = Array.from({ length: size }, () => Array.from({ length: size }));
        console.log(data)
        console.log(buildingCubes)
    }

    function stateUpdate() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const tile = data[x][y];
                tile.update()
            }
        }
    }

    function renderUpdate(scene) {
        // console.log(data)
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const tile = data[x][y];
                // at state 4, it's done, so no need to render
                if (tile.isRemoved) {

                    if (buildingCubes[x][y]) {
                        scene.remove(buildingCubes[x][y])
                        buildingCubes[x][y] = undefined
                    }
                    continue
                }
                if (buildingStateTypes.includes(tile.building)
                    && tile.building !== buildingStateTypes.state_4) {
                    const cube = createAssetInstance(tile.building, x, y)
                    if (cube === undefined) continue
                    if (buildingCubes[x][y] !== undefined) {
                        scene.remove(buildingCubes[x][y])
                    }
                    scene.add(cube)
                    buildingCubes[x][y] = cube
                }
            }
        }
    }

    function addBuilding(x, y) {
        let building = new BuildingObject(x, y)
        building.building = buildingStateTypes.state_0
        if (window.menu?.selectedItem) {
            building.building = window.menu.selectedItem
        }
        data[x][y] = building;
    }

    function removeBuilding(x, y) {
        data[x][y].isRemoved = true;
    }



    return {
        size,
        data,
        addBuilding,
        removeBuilding,
        initializeCity,
        renderUpdate,
        stateUpdate,
    }
}



export { createCity }