import Core from 'checheza_core';
import Hammer from 'hammerjs';
import $ from 'jquery';

class BookDomain {
	constructor(widget) {
		this.widget = widget;
	}

	start(book) {
        this.bookLength;
		this.audio = [];
        this.currentPage = 0;
        
        Core.audio.unloadAll();

		Core.utils.addBackButton();
		Core.utils.adjustAspectRatio();

		var touch = new Hammer.Manager(document.getElementById('bookswipe'));
		var mc = new Hammer(document.getElementById('bookswipe'));
		touch.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
		touch.add(new Hammer.Tap({ event: 'singletap' }));
		touch.get('doubletap').recognizeWith('singletap');
		touch.get('singletap').requireFailure('doubletap');

		mc.on('swipeleft swiperight', (event) => {
			switch (event.type) {
				case 'swiperight':
					this.prevPage();
					break;
				case 'swipeleft':
					this.nextPage();
					break;
			}
		});

		touch.on('singletap doubletap', (event) => {
			switch (event.type) {
				case 'doubletap':
					this.prevPage();
					break;
				case 'singletap':
					this.nextPage();
					break;
			}
		});

		Core.filesystem.getUri(book).then((uri) => {
			this.path = uri.uri;
			Core.filesystem
				.readFolder(book)
				.then((entries) => {
					return entries.files;
				})
				.then((pages) => {
					// Get page pngs
					this.bookLength = pages
						.filter((resource) => resource.indexOf('.png') !== -1)
						.filter((resource) => resource.indexOf('front')).length + 1;

					// get audio resources
					let audioLength = pages.filter(
						(resource) => resource.indexOf('.ogg') !== -1
					).length + 1;

					
					for (let i = 1; i < this.bookLength; i++) {
						$('.swipe-wrap').append(this.getPage(`${this.path}page${i}.png`, i));
					}

                    for (let i = 1; i < audioLength; i++) {
						this.audio.push(`${this.path}page${i}.ogg`);
                    }
                    
                    $('.swipe-wrap').css('width', ($('.swipe-wrap > div').length * $('#core_app_container').width()) + "px");


                    this.playAudio(0);
				});
		});
	}

	nextPage() {
		this.changePage(this.currentPage + 1);
	}

	prevPage() {
		this.changePage(this.currentPage - 1);
	}

	changePage(to) {
		if (to >= 0 && to < this.bookLength - 1) {
			this.currentPage = to;
            let left = to * $('#core_app_container').width() + 'px';
            
			$('.swipe-wrap').css(
				'-webkit-transform',
				'translateX(-' + left + ')'
            );
            
			this.playAudio(this.currentPage);
		}

		if (to < 0) {
			this.widget.openDomain('bookshelf');
		}

		if (to >= this.bookLength - 1) {
			this.widget.openDomain('bookshelf');
		}
    }
    
    playAudio(page) {
        Core.audio.stopAll();
        if(this.audio[page]) {
            Core.audio.play(this.audio[page]);
        }
    }

	getPage(path, i) {
		return `<div class="page" style="width:${$(
			'#core_app_container'
		).width()}px;" data-page="${i}"><img src="${path}"></div>`;
	}

	render() {
        return `
            <style>  
            .swipe-wrap {
                height:100%;
                transition: all 0.5s ease;
            }

            .swipe-wrap div {
                display:inline;
            }
            
            .swipe-wrap img {
                height:100vh;
                width:inherit;
                pointer-events:none;
            }
            </style>
            <div class="widgetBackground" style="background-image:none; background-color:#fff;">
                <div id="bookswipe" class="swipe-wrap">
                </div>
            </div>
        `;
	}
}

export default BookDomain;
