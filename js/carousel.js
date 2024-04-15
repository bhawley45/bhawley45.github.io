// Define SFX and variables
const hoverSound = new Audio("./sounds/funny/sfx_hover.wav");
const clickSound = new Audio("./sounds/funny/sfx_click.wav");
const insertCartridgeSound = new Audio(
  "./sounds/funny/sfx_insertCartridge.wav"
);
const typingSound = new Audio("./sounds/sfx_typing.wav"); // Path to your typing sound
const typingElements = document.querySelectorAll(".typing-text"); // All elements to animate with typing
const consoleContainer = document.getElementById("console-container");
const pagination = document.querySelector(".swiper-pagination");

let isSwiperDisabled = false; // Track swiper element

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const cartridges = document.querySelectorAll(".cartridge-image");

    // Initialize Swiper
    const swiper = new Swiper(".carousel-container", {
      loop: true, // Enable infinite loop
      allowTouchMove: true, // Allow movement with touchscreen swipe
      centeredSlides: true, // Active slide centered
      grabCursor: true,
      slideToClickedSlide: true, // Move clicked slide to center
      direction: "horizontal",
      slidesPerGroup: 1,
      speed: 900, // Transitional speed

      autoplay: {
        // Autoplay slides
        delay: 4250,
      },
      pagination: {
        // Show dot for each slide
        el: ".swiper-pagination",
        clickable: false, // NEED TO FIX ISSUES WITH CLICKING
      },
      navigation: {
        // Navigation buttons
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // Adjusting number of cartridges based on viewport
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.75,
          spaceBetween: 10,
        },
        // when window width is >= 420px
        420: {
          slidesPerView: 1.85,
          spaceBetween: 12.5,
        },
        // when window width is >= 520px
        520: {
          slidesPerView: 2.25,
          spaceBetween: 15,
        },
        // when window width is >= 620px
        620: {
          slidesPerView: 2.75,
          spaceBetween: 17.5,
        },
        // when window width is >= 820px
        820: {
          slidesPerView: 3,
          spaceBetween: 22.5,
        },
        // when window width is >= 1020px
        1200: {
          slidesPerView: 3.5,
          spaceBetween: 25,
        },
      },
    });

    cartridges.forEach((cartridge) => {
      cartridge.addEventListener("mouseenter", (event) => {
        const target = event.target;
        if (!isSwiperDisabled) {
          // Only run if user hasn't selected a cartridge
          target.style.transform = "scale(1.1)";
          hoverSound.play(); // Play hover sound
        }
      });

      cartridge.addEventListener("mouseleave", (event) => {
        const target = event.target;
        // Bug: Remove jerkyness when user clicks cartridge and animation plays
        target.style.transform = "scale(1)";
      });

      cartridge.addEventListener("click", (event) => {
        clickSound.play(); // Play click sound
        if (!isSwiperDisabled) {
          // Only run if user hasn't selected a cartridge
          handleCartridgeClick(event.target);
          swiper.disable(); // Keep user from moving carousel after click
          isSwiperDisabled = true;
        }
      });
    });

    function handleCartridgeClick(cartridge) {
      // Remove pagination bar from view
      pagination.classList.add("pagination-disabled");

      // Center the clicked cartridge
      swiper.slideToClickedSlide = true; // See on:(click) above
      swiper.slidesPerView = 1;

      animateCartridgeInsertion(cartridge);

      setTimeout(() => {
        insertCartridgeSound.play(); // Play insert sound
        setTimeout(() => {
          loadProjectPage(cartridge); // Wait for animations and sounds to finish
        }, 200);
      }, 200); // Adjust timeout as necessary for the animation to complete
    }

    function animateCartridgeInsertion(clickedCartridge) {
      // Move console up
      consoleContainer.style.bottom = "0px"; // distance from bottom of parent container
      consoleContainer.style.opacity = "1";
      clickedCartridge.classList.add("insert-cartridge");
    }

    //NEEDS IMPLIMENTED!!!!
    function loadProjectPage(clickedCartridge) {
      const projectUrl = clickedCartridge.getAttribute("data-project-url");
      if (projectUrl) {
        window.location.href = projectUrl; // Redirect to the project page
      }
    }

    // Typing animation
    typingElements.forEach((element, index) => {
      // Delay the start of each typing animation
      setTimeout(() => {
        element.classList.add("typing");
        typingSound.play();
      }, index * 225); // Adjust timing for each index of typing-text found
    });
  });
})();
