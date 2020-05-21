import Core from 'checheza_core';
import style from '../assets/modules.css';
import style_ from '../assets/categories.css';

class ModulesDomain {
    constructor(widget) {
        this.widget = widget;
    }

    start(category) { 
        //$('#module_category').text(category); 

        Core.backend.GET("/modules/category/"+category)
        .then(response => {
            this.printModules(JSON.parse(response));
        });

        Core.utils.addBackButton();
    }

    render() {
        return `<div id="widgetBackground" style="background-color: #F9F7FA; height:100vh;">
            <div class="${ style.instructions }">
                Find a new Module 
            </div>
            <div id="${ style.module_math }">
                <div class="${ style_.sections }" id="all-modules">
                </div>
            </div>
        </div>`
    }

    printModules(modules) {
        for (let module of modules) {
            document.getElementById("all-modules").innerHTML += `
                <div style="pointer: click;" id="${ module.title }" class="${ style_.section_item }">
                    <div class="${ style_.item }">
                        <img src="${ module.thumbnail }" alt="" />
                    </div>
                    <div class="${ style.image_text }">
                        <button style"margin: 0em;" class="button"> Primary 1 </button>
                        <p id="${ style.example_title }">${ module.title }</p>
                    </div>
                </div>
            `;
    
            setTimeout(() => { 
                document.querySelector(`#${module.title}`).onclick = () => {
                    this.widget.openDomain("module", module);
                };
            }, 100);
        }
    }
}

export default ModulesDomain;