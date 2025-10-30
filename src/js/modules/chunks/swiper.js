new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  grabCursor: true,
  loop: true,
  speed: 800,

  autoplay: {
    delay: 3500,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    767.8: {},
  }
});

