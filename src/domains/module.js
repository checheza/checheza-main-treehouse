import Core from 'checheza_core';
import style from '../assets/module.css';

class ModuleDomain {
    constructor(widget) {
        this.widget = widget;
    }

    start(payload) {
        let module = payload.module;
        let isModule = payload.isModule;

        if (!isModule) {
            module.pictures[0] = module.thumbnail;
        }

        document.getElementById('module_title').innerText = module.title; 
        document.getElementById('module_description').innerText = module.description;
        document.getElementById('module_image').style.backgroundImage = "url('"+module.thumbnail+"')";
        
        document.getElementById('module_download').addEventListener('click', e => { 
            e.preventDefault();
            if(isModule)
                Core.backend.downloadModule(module.file); 
            else
                Core.backend.downloadBook(module.file);
        });

        Core.utils.addBackButton();
    }

    render() {
        return `<div id="widgetBackground" style="background-color: #F9F7FA; display: flex;">
            <div class="${ style.module_math }">
                <section class="${ style.module_class }" id="module_image">
                    &nbsp;
                </section>
                <section class="${ style.text_side }">
                    <div class="${ style.text_items }">
                        <p id="module_title" style="font-size: 48px;"></p>
                        <p style="font-size: 32px;" id="module_description"></p>
                        <div id="sample_module"></div>
                        <a href="" id="module_download" class="${ style.downloadButton }"> <i class="fa fa-play fa-lg" style="padding-right: 10px;"></i> Download</a>
                    </div>
                </section>
            </div>
        </div>
        <!-- The Modal -->
        <div id="downloadingModal" class="modal" onclick="document.getElementById('downloadingModal').style.display='none';">

            <!-- Modal content -->
            <div class="modal-content">
                <span class="close-modal" onclick="document.getElementById('downloadingModal').style.display='none';">&times;</span>
                <div id="modal-body" title="Downloading...">Downloading...</div>
            </div>

        </div>`
    }
}


export default ModuleDomain;