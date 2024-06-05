import * as THREE from 'three';
import { createAssetInstance, buildingTypes } from './assets.js';

class BuildingObject {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.areaPoints = [{ x, y }]
        this.isRemoved = false
    }
    static initializeNewBuilding = (x, y, state) => {
        let mybuild = new BuildingObject(x, y)
        mybuild.building = state
        return mybuild
    }
    update() {
        //check if it's in building state types
        switch (this.building) {
            case buildingTypes.state_0:
                this.building = buildingTypes.state_1
                break;
            case buildingTypes.state_1:
                this.building = buildingTypes.state_2
                break;
            case buildingTypes.state_2:
                this.building = buildingTypes.residential
                break;
            // case buildingTypes.state_3:
            //     this.building = buildingTypes.state_no_update
            //     break;
            case buildingTypes.gas_station:
                // console.log('gas station')
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
        // console.log(buildingCubes)
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
                if (buildingTypes.includes(tile.building)
                    && tile.building !== buildingTypes.state_no_update) {
                    if (buildingCubes[x][y] !== undefined
                        && buildingCubes[x][y]?.userData !== undefined
                        && buildingCubes[x][y]?.userData?.buildingId === tile.building
                    ) 
                    {
                        // console.log('buildingCubes[x][y]?.userData:', buildingCubes[x][y]?.userData?.buildingId)
                        // console.log('tile.building:', tile.building)
                        // console.log('got skipped');
                        continue
                    }
                    console.log('buildingCubes[x][y]?.userData:', buildingCubes[x][y]?.userData?.buildingId)
                    console.log('tile.building:', tile.building)
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
        console.log('in add building');
        let building = new BuildingObject(x, y)
        building.building = buildingTypes.state_0
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