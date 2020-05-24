import Core from 'checheza_core';

class BookStore {
	constructor(widget) {
		this.widget = widget;
	}

	start() {
        // add logic here.
        Core.utils.addBackButton();
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

    render() {
        return `<div id="widgetBackground" style="background-color: #F9F7FA; height:100vh;">
            <div class="${ style.instructions }">
                Find a new Book 
            </div>
            <div id="${ style.module_math }">
                <div class="${ style_.sections }" id="all-modules">
                    No books found.
                </div>
            </div>
        </div>`
    }
}

export default BookStore;