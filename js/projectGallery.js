document.addEventListener("DOMContentLoaded", () => {
  var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    loop: true,
    loopedSlides: 3, // Match # of total slides
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: "auto",
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 3, // Match # of total slides
    watchSlidesVisibility: true, // This ensures that only visible thumbs are clickable
    watchSlidesProgress: true, // This ensures that thumbs progress is watched
  });

  // Controllers
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
});
