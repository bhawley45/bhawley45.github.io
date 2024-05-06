document.addEventListener("DOMContentLoaded", () => {
  var galleryTop = new Swiper(".gallery", {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      galleryTop.slideToLoop(index, 500);
    });
  });

  galleryTop.on("slideChange", function () {
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.remove("thumb-active");
      if (galleryTop.realIndex === idx) {
        thumb.classList.add("thumb-active");
      }
    });
  });

  // Set initial active thumbnail
  thumbnails[galleryTop.realIndex].classList.add("thumb-active");
});
