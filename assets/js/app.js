// "use strict";

$(function () {
    // fixed header
    $(window).scroll(function () {
        var height = $(window).scrollTop(); /*Если сделали скролл на 100px задаём новый класс для header*/
        if (height > 50) { $('header').addClass('header-fixed'); } else { /*Если меньше 100px удаляем класс для header*/
            $('header').removeClass('header-fixed');
        }
    });
    // fixed header



    // burger - btn
    $(".burger").on("click", function () {
        $('header').toggleClass("mobile-nav");
        $('body').toggleClass("block-scroll");
    });
    // burger - btn

    // select
    $(".custom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function () {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });
    // select

});


// Sliders--------------------

new Swiper('.team__slider', {

    slidesPerView: 'auto',
    watchOverflow: true,


    navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next'
    },

    breakpoints: {

        556: {
            spaceBetween: 20,
            centeredSlides: false,


        },


        320: {
            centeredSlides: true,
            spaceBetween: 10,

        },

    },

    // If we need pagination
    scrollbar: {
        el: '.swiper-scroll',
        draggable: true
    },

    mousewheel: {
        sensitivity: 1,
        evntsTarget: ".team__slider"
    }

});


// upload file button
const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("fileBtn");
const customTxt = document.getElementById("upload-name");

customBtn.addEventListener("click", function () {
    realFileBtn.click();
});

realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value.match(
            /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
});
// upload file button


// TABS

const tabs = document.querySelector('.tabs');
const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsContent = document.querySelectorAll('.tabs__content');

if (tabs) {
    tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tabs__btn')) {
            const tabsPath = e.target.dataset.tabsPath;
            tabsBtn.forEach(el => { el.classList.remove('tabs__btn--active') });
            document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
            tabsHandler(tabsPath);
        }

        if (e.target.classList.contains('tabs__arrow--prev')) {
            let activeBtn = document.querySelector('.tabs__btn--active');
            let activeParent = activeBtn.closest('.tabs__item');
            let previousParent = activeParent.previousElementSibling;

            if (previousParent) {
                let prevActive = previousParent.querySelector('.tabs__btn')
                tabsBtn.forEach(el => { el.classList.remove('tabs__btn--active') });
                prevActive.classList.add('tabs__btn--active');

                let path = prevActive.dataset.tabsPath;
                tabsHandler(path);
            }
        }

        if (e.target.classList.contains('tabs__arrow--next')) {
            let activeBtn = document.querySelector('.tabs__btn--active');
            let activeParent = activeBtn.closest('.tabs__item');
            let nextParent = activeParent.nextElementSibling;

            if (nextParent) {
                let nextActive = nextParent.querySelector('.tabs__btn');
                tabsBtn.forEach(el => { el.classList.remove('tabs__btn--active') });
                nextActive.classList.add('tabs__btn--active');

                let path = nextActive.dataset.tabsPath;
                tabsHandler(path);
            }
        }
    });
    const tabsHandler = (path) => {
        tabsContent.forEach(el => { el.classList.remove('tabs__content--active') });
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
    };
}



// pop up 

let popupBg = document.querySelector('#popupBg'); // Фон попап окна
let popup = document.querySelector('#popupInner'); // Само окно
let openPopupButtons = document.querySelectorAll('#openPopup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('#closePopup'); // Кнопка для скрытия окна

if (popupBg) {
    openPopupButtons.forEach((button) => { // Перебираем все кнопки
        button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
            e.preventDefault(); // Предотвращаем дефолтное поведение браузера
            popupBg.classList.add('active'); // Добавляем класс 'active' для фона
            popup.classList.add('active'); // И для самого окна
            document.querySelector('body').classList.add('block-scroll');
        })
    });

    closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
        document.querySelector('body').classList.remove('block-scroll');
    });

    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if (e.target === popupBg) { // Если цель клика - фон, то:
            popupBg.classList.remove('active'); // Убираем активный класс с фона
            popup.classList.remove('active'); // И с окна
            document.querySelector('body').classList.remove('block-scroll');
        }
    });
}
// pop up

// accordion script
let accordItem = document.querySelectorAll('.accordion__item');
if (accordItem) {
    accordItem.forEach(item => {
        item.addEventListener('click', function () {
            if (this.classList.contains('accordion--open')) {
                this.classList.remove('accordion--open');
            } else {
                for (el of accordItem) {
                    el.classList.remove('accordion--open');
                }
                this.classList.add('accordion--open');
            }
        });
    });
}