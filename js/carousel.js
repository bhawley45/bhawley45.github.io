// Define sound effects
const hoverSound = new Audio('path_to_hover_sound.mp3');
const clickSound = new Audio('path_to_click_sound.mp3');
const insertCartridgeSound = new Audio('path_to_insert_sound.mp3');

document.addEventListener('DOMContentLoaded', () => {
    const cartridges = document.querySelectorAll('.swiper-slide');
    
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Enable infinite loop
        allowTouchMove: true, // Allow movement with touchscreen swipe
        centeredSlides: true, // Active slide centered
        direction: 'horizontal',
        spaceBetween: 50, // Space between slides
        slidesPerView: 2.75,
        slidesPerGroup: 1,
        speed: 900, // Transitional speed
        autoplay: { // Autoplay slides
           delay: 4250,
        },
        pagination: { // Show dot for each slide
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: { // Navigation buttons
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Adjusting number of cartridges based on viewport
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1.75,
              spaceBetween: 15
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20
            },
            720: {
                slidesPerView: 3,
              spaceBetween: 35
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 45
            }
          }
    });

    cartridges.forEach(cartridge => {
        cartridge.addEventListener('mouseenter', (event) => {
            const target = event.target;
            target.style.transform = 'scale(1.05)';
            //target.style.boxShadow = '0px 0px 20px rgba(255, 255, 255, 0.6)'; // Add glow effect
            pushSiblings(target, 20);
            hoverSound.play(); // Play hover sound
        });

        cartridge.addEventListener('mouseleave', (event) => {
            const target = event.target;
            target.style.transform = 'scale(1)';
            target.style.boxShadow = 'none'; // Remove glow effect
            pushSiblings(target, 0);
        });

        cartridge.addEventListener('click', (event) => {
            clickSound.play(); // Play click sound
            handleCartridgeClick(event.target);
        });
    });

    function pushSiblings(target, distance) {
        let prev = target.previousElementSibling;
        let next = target.nextElementSibling;

        // Move previous siblings to the left
        while (prev) {
            prev.style.transform = `translateX(-${distance}px)`;
            prev = prev.previousElementSibling;
        }

        // Move next siblings to the right
        while (next) {
            next.style.transform = `translateX(${distance}px)`;
            next = next.nextElementSibling;
        }
    }

    function handleCartridgeClick(cartridge) {
        flyAwaySiblings(cartridge);
        animateCartridgeInsertion(cartridge);
        setTimeout(() => {
            swiper.autoplay.stop(); // Stop swiper autoplay
            insertCartridgeSound.play(); // Play insert sound
            loadProjectPage(cartridge);
        }, 500); // Adjust timeout as necessary for the animation to complete
    }

    function flyAwaySiblings(clickedCartridge) {
        const siblings = Array.from(clickedCartridge.parentNode.children);
        const clickedIndex = siblings.indexOf(clickedCartridge);
    
        siblings.forEach((sibling, index) => {
            if (index < clickedIndex) {
                sibling.classList.add('fly-left');
            } else if (index > clickedIndex) {
                sibling.classList.add('fly-right');
            }
        });
    }

    function animateCartridgeInsertion(clickedCartridge) {
        clickedCartridge.classList.add('insert-cartridge');
    }

    //NEEDS IMPLIMENTED!!!!
    function loadProjectPage(clickedCartridge) {
        const projectUrl = clickedCartridge.getAttribute('data-project-url');
        if (projectUrl) {
            window.location.href = projectUrl; // Redirect to the project page
        }
    }
});
