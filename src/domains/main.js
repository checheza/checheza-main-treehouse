import styles from '../assets/treehouse.css';
import Core from 'checheza_core';
import Loop from '../assets/loop.ogg';


class MainDomain {

    constructor(widget) {
        this.widget = widget;
        this.started = false;
    }

    start() {
        Core.utils.addSky('partly-cloudy');
        Core.utils.setSkyColor("#5fccff");
        Core.utils.addExitButton();
        Core.utils.makeZoomable();

        Array.from(document.getElementsByClassName("widget"))
        .forEach(elem => {
            if(!this.started) {
                elem.classList.add(styles.fadeindelay);
        
                elem.addEventListener('animationend', () => {
                    elem.classList.remove(styles.fadeindelay);
                    elem.classList.add(styles.pulse);
                });
            } else {
                elem.classList.add(styles.pulse);
            }
            elem.addEventListener('click', e => {
                this.widget.openDomain('category', e.target.id);
            });
        });

        
        if(!this.started) {
            document.getElementById("tree").classList.add(styles["climb_fast"]);
            Core.audio.play(Loop);
            this.started = true;
        }
    }

    render() {
        return `
        <div id="${ styles.widgetBackground }">
            <div id="tree" class="${ styles.tree }">
                <div id="braintrain" class="${ styles.braintrain } treehouse widget btn"></div>
                <div id="math" class="${ styles.math } treehouse widget btn"></div>
                <div id="writing" class="${ styles.writing } treehouse widget btn"></div>
                <div id="reading" class="${ styles.reading } treehouse widget btn"></div>
            </div> 
        </div>`
    }

}

export default MainDomain;