import Core from 'checheza_core';
import style from '../assets/module.css';

class ModuleDomain {
    constructor(widget) {
        this.widget = widget;
    }

    start(module) {
        document.getElementById('module_title').innerText = module.title; 
        document.getElementById('module_description').innerText = module.description;   
        document.getElementById('module_image').setAttribute("src", module.pictures[0]);
        
        document.getElementById('module_download').addEventListener('click', e => { 
            e.preventDefault();
            Core.backend.downloadModule(module.file); 
        });

        Core.utils.addBackButton();
    }

    render() {
        return `<div id="widgetBackground" style="background-color: #F9F7FA;">
            <div class="${ style.module_math }">
                <section class="${ style.module_class }">
                    <img class="${ style.image_class }" id="module_image" src="">
                </section>
                <section class="${ style.text_side }">
                    <div class="${ style.text_items }">
                        <button class="${ style.button_class }" style="margin: 0em;">Primary 1</button>
                        <p id="module_title" style="font-size: 48px;"></p>
                        <p style="font-size: 32px;" id="module_description"></p>
                        <div id="sample_module"></div>
                        <a href="" id="module_download" class="${ style.downloadButton }"> <i class="fa fa-play fa-lg" style="padding-right: 10px;"></i> Download</a>
                    </div>
                </section>
            </div>
        </div>`
    }
}


export default ModuleDomain;