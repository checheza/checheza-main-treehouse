import Core from 'checheza_core';
import styles from '../assets/treehouse.css';
import styles_ from '../assets/modules.css';
import categories from '../assets/categories.css';

class CategoryDomain {

    constructor(widget) {
        this.widget = widget;
    }

    start(category) {
        this.printCurrentModules(category);

        document.getElementById("add_more").addEventListener('click', () => { 
            this.widget.openDomain("modules", category);
        });
        
        Core.utils.addBackButton();
    }

    render() {
        return `
        <style>
            #sections::-webkit-scrollbar {
                display: none;
            }
        </style>
        <div id="${ styles.widgetBackground}" style="background-color: rgb(54, 37, 16);">
            <div style="color:#fff;" class="${ styles_.instructions }">
                Play now
            </div>
    
            <div id="sections" class="${ categories.sections }">
                <div class="${ categories.section_item}">
                    <div class="${ categories.item}">
                        <div id="add_more" class="${ categories.add_more}"></div>
                    </div>
                </div>
            </div>
        </div>`
    }

    printCurrentModules(category) {
        let addons = Core.getAllModulesInCategory(category);

        for (let addon of addons) {

            let sectionItem = document.createElement('div');
            sectionItem.classList.add(categories.section_item);
            sectionItem.addEventListener('click', () => { Core.startWidget(addon.identifier) });
            sectionItem.innerHTML = `<img style="transform: scale(1.2) translateX(6%) translateY(6%);" class="image_class" src="${addon.path.uri}/${addon.icon}">`;
            document.getElementById('sections').appendChild(sectionItem);
        }
    }
}

export default CategoryDomain

