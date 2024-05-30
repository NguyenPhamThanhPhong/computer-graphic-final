import {createScene} from './src/scene.js';
import {Menu} from './src/menu.js';

window.onload = () => {
    window.scene = createScene();
    window.scene.start();
    setInterval(() => {
        window.scene.intervalUpdate()
    }, 1000);

    // window.setActiveTool= (event, toolId)=>{
    //     window.scene.setActiveTool(toolId);
    //     const toolButtons = document.querySelectorAll('.tool');
    //     toolButtons.forEach((button) => {
    //         button.classList.remove('active');
    //     });
    //     event.target.classList.add('active');
    // }
}
window.onclose = () => {
    window.scene.stop();
}

function main(){
    window.menu = new Menu();
    window.menu.createMenuItemEvents();
}
main();