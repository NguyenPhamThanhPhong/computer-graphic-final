

function menuItemMouseDown(button) {
    button.style.backgroundColor = "#FF0000";
}
const areaPointsCalculator = {
    'residential': (x, y) => {
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
        const point1 = { x: x - 1, y: y - 1 };
        const point2 = { x: x, y: y - 1 };
        const point3 = { x: x + 1, y: y - 1 };
        const point4 = { x: x - 1, y: y };
        const point5 = { x: x, y: y };
        const point6 = { x: x + 1, y: y };
        const point7 = { x: x - 1, y: y + 1 };
        const point8 = { x: x, y: y + 1 };
        const point9 = { x: x + 1, y: y + 1 };
        return [point1, point2, point3, point4, point5, point6, point7, point8, point9];
    }
}

class Menu {
    constructor() {
        this.items = ['cursor','bulldoze', 'residential', 'commercial', 'industrial', 'road'];
        this.selectedItem = this.items[0];
    }

    getSelectedAreaPoints(x, y) {
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

        let selectedControl = bulldoze;

        // make this function a method of the class
        const handleMenuItem = (event, toolId) => {
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

    }
}


export { Menu };