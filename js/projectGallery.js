document.addEventListener("DOMContentLoaded", () => {
  var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    loopedSlides: 4,
  });
  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: "auto",
    touchRatio: 0.2,
    slideToClickedSlide: true,
  });

  // Controllers
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
});
