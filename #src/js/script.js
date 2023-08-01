//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
/* @@include("./chunks/my-dynamic_adap.js"); // ДИНАМИЧЕСКИЙ АДАПТИВ */

/* @@include("./chunks/my-scroll_header.js"); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ */

@@include("./chunks/my-swiper.js"); // НАСТРОЙКИ СЛАЙДЕРА 

/* @@include("./chunks/my-quantity.js"); // СЧЁТЧИКИ */

@@include("./chunks/my-tabs.js"); // СЧЁТЧИКИ 

@@include("./chunks/my-spoiler.js"); // СПОЙЛЕРЫ 

/* @@include("./chunks/my-popup.js"); // ПОПАПЫ */

//< " СКРИПТЫ " >=============================================================================================================>//

let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
  document.body.classList.add("_touch");
} else {
  document.body.classList.add("_pc");
}

//< " СКРИПТЫ " >=============================================================================================================>//

const menu = document.querySelector('.header__nav')
const backdrop = document.querySelector('.header__backdrop')
document.querySelector(".header__burger").addEventListener('click', () => {
  menu.classList.add('_active')
  backdrop.classList.add('_active')
})

document.querySelector(".header__close").addEventListener('click', () => {
  menu.classList.remove('_active')
  backdrop.classList.remove('_active')
})

backdrop.addEventListener('click', () => {
  menu.classList.remove('_active')
  backdrop.classList.remove('_active')
})

