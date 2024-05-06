document.addEventListener("DOMContentLoaded", (event) => {
  const swiper = new Swiper("#testimonials", {
    effect: "cards",
    loop: true,
    speed: 700,

    pagination: {
      el: "#testimonials .swiper-pagination",
      clickable: true,
    },
    autoplay: {
      // Autoplay slides
      delay: 6000,
    },
  });
});
