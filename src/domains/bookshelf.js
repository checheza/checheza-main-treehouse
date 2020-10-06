import Core from 'checheza_core';
import BookshelfBackground from '../assets/bookshelf_background.png';
import BookBackground from '../assets/book_cover.png';
import $ from 'jquery';
import 'slick-carousel';
import AddMoreImage from '../assets/add-more-400.jpg';

class BookshelfDomain {
    constructor(widget) {
        this.widget = widget;
    }

    start() { 
        Core.utils.adjustAspectRatio();
        Core.utils.addBackButton();

        Core.filesystem.readFolder('/books/')
        .then((entries) => { 
            return entries.files;
        }).then((books) => { this.populateBookshelf(books); });
    }

    populateBookshelf(books) {

        $('#swipe').slick({
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            infinite: true,
            centerMode: false,
            adaptiveHeight: true,
            touchTreshold: 1
          });
          
          let bookElement = document.createElement("div");
          bookElement.classList.add("book_preview", "fadeIn", "animated");

          let bookCoverElement = document.createElement("img");
          bookCoverElement.classList.add("cover_thumb");
          bookCoverElement.src = AddMoreImage;
          
          bookElement.appendChild(bookCoverElement);

          bookElement.addEventListener('click', () => {
              this.widget.openDomain('modules', 'book');
          });

          $('#swipe').slick('slickAdd', bookElement);

        for(let book of books) {
            Core.filesystem.getUri(`/books/${book}/page1.png`)
            .then(bookCover => {
                let bookElement = document.createElement("div");
                bookElement.classList.add("book_preview", "fadeIn", "animated");

                let bookCoverElement = document.createElement("img");
                bookCoverElement.classList.add("cover_thumb");
                bookCoverElement.src = bookCover.uri;
                
                bookElement.appendChild(bookCoverElement);


                bookElement.addEventListener('click', () => {
                    this.widget.openDomain('book', `/books/${book}/`);
                });

                $('#swipe').slick('slickAdd', bookElement);
            });
        }
    }

    render() {
        return `
            <style>
            .slick-slider
            {
                position: relative;

                display: block;
                box-sizing: border-box;

                -webkit-user-select: none;
                -moz-user-select: none;
                    -ms-user-select: none;
                        user-select: none;

                -webkit-touch-callout: none;
                -khtml-user-select: none;
                -ms-touch-action: pan-y;
                    touch-action: pan-y;
                -webkit-tap-highlight-color: transparent;
            }

            .slick-list
            {
                position: relative;

                display: block;
                overflow: hidden;

                margin: 0;
                padding: 0;
            }
            .slick-list:focus
            {
                outline: none;
            }
            .slick-list.dragging
            {
                cursor: pointer;
                cursor: hand;
            }

            .slick-slider .slick-track,
            .slick-slider .slick-list
            {
                -webkit-transform: translate3d(0, 0, 0);
                -moz-transform: translate3d(0, 0, 0);
                    -ms-transform: translate3d(0, 0, 0);
                    -o-transform: translate3d(0, 0, 0);
                        transform: translate3d(0, 0, 0);
            }

            .slick-track
            {
                position: relative;
                top: 0;
                left: 0;

                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .slick-track:before,
            .slick-track:after
            {
                display: table;

                content: '';
            }
            .slick-track:after
            {
                clear: both;
            }
            .slick-loading .slick-track
            {
                visibility: hidden;
            }

            .slick-slide
            {
                display: none;
                float: left;

                height: 100%;
                min-height: 1px;
            }
            [dir='rtl'] .slick-slide
            {
                float: right;
            }
            .slick-slide img
            {
                display: block;
            }
            .slick-slide.slick-loading img
            {
                display: none;
            }
            .slick-slide.dragging img
            {
                pointer-events: none;
            }
            .slick-initialized .slick-slide
            {
                display: block;
            }
            .slick-loading .slick-slide
            {
                visibility: hidden;
            }
            .slick-vertical .slick-slide
            {
                display: block;

                height: auto;

                border: 1px solid transparent;
            }
            .slick-arrow.slick-hidden {
                display: none;
            }

                .widgetBackground {
                    background-image:url("${BookshelfBackground}");
                    background-size:100% 100%;
                    background-repeat:none;
                    width: 100%;
                    height:100%;
                    background-color:#fff;
                }
                
                #swipe {
                    display:inline;
                    width:100%;
                }
                
                #swipe .slick-list {
                    height:100%;
                    padding-left: 7%;
                    padding-top:5%;
                }
                
                #swipe .slick-track { 
                    height:60%;
                    margin-top: 15%;
                    margin-left: -5%;
                    float: left;
                
                }

                .book_preview {
                    height: 85%;
                    width: 65%;
                    float: left;
                    background-size: 100% 100%;
                    background-image: url("${BookBackground}");
                }
                
                .cover_thumb {
                    width:80%;
                    margin:0 auto;
                    margin-top:10%;
                    padding-bottom:40%;
                }
                
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
            <div class="widgetBackground">
                <div id="swipe">

                </div>
            </div>
        `
    }
}

export default BookshelfDomain;