import Core from 'checheza_core';
import style from '../assets/modules.css';
import style_ from '../assets/categories.css';
import style__ from '../assets/module.css';

class ModulesDomain {
    constructor(widget) {
        this.widget = widget;
    }

    start(category) { 
        //$('#module_category').text(category); 
        this.category = category;
        let labelElem = document.getElementById("label");
        this.label = category === "book" ? labelElem.innerText = "Find a new Book" : labelElem.innerText = "Find a new Module";

        Core.backend.GET("/modules/category/"+category)
        .then(response => {
            this.printModules(JSON.parse(response));
        });

        Core.utils.addBackButton();
    }

    render() {
        return `
        <style>
            #all-modules::-webkit-scrollbar {
                display: none;
            }
        </style>
        <div id="widgetBackground" style="background-color: #F9F7FA; height:100vh;">
            <div id="label" class="${ style.instructions }">
               
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
                <div style="pointer: click;" id="id_${ module.id }" class="${ style_.section_item }">
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
                document.querySelector(`#id_${module.id}`).onclick = () => {
                    this.widget.openDomain("module", { module: module, isModule: this.category !== "book" ? true: false });
                };
            }, 100);
        }
    }
}

export default ModulesDomain;