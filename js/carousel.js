// Define sound effects and variables
const hoverSound = new Audio('./sounds/funny/sfx_hover.wav');
const clickSound = new Audio('./sounds/funny/sfx_click.wav');
const insertCartridgeSound = new Audio('./sounds/funny/sfx_insertCartridge.wav');
const typingSound = new Audio('./sounds/sfx_typing.wav'); // Path to your typing sound
const typingElements = document.querySelectorAll('.typing-text'); // All elements to animate with typing
const consoleContainer = document.getElementById('console-container');
const pagination = document.querySelector('.swiper-pagination');

let isSwiperDisabled = false; // Track swiper element

document.addEventListener('DOMContentLoaded', () => {
    const cartridges = document.querySelectorAll('.cartridge-image');
    
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Enable infinite loop
        allowTouchMove: true, // Allow movement with touchscreen swipe
        centeredSlides: true, // Active slide centered
        direction: 'horizontal',
        slidesPerGroup: 1,
        speed: 900, // Transitional speed
        autoplay: { // Autoplay slides
           delay: 4250,
        },
        pagination: { // Show dot for each slide
            el: '.swiper-pagination',
            clickable: false, // NEED TO FIX ISSUES WITH CLICKING
        },
        navigation: { // Navigation buttons
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Adjusting number of cartridges based on viewport
        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1.25,
              spaceBetween: 10
            },
            // when window width is >= 420px
            420: {
                slidesPerView: 1.75,
                spaceBetween: 12.5
              },
            // when window width is >= 520px
            520: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            // when window width is >= 620px
            620: {
              slidesPerView: 2.25,
              spaceBetween: 17.5
            },
            // when window width is >= 720px
            720: {
                slidesPerView: 2.5,
              spaceBetween: 20
            },
            // when window width is >= 820px
            820: {
                slidesPerView: 2.75,
                spaceBetween: 22.5
            },
            // when window width is >= 920px
            920: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            // when window width is >= 1020px
            1020: {
              slidesPerView: 3.25,
              spaceBetween: 27.5
            }
        },
        on: {
            click() {
                console.log('index', this.clickedIndex);
                swiper.slideTo(this.clickedIndex); // Move clicked slide to center
                swiper.disable(); // Keep user from moving carousel after click
                isSwiperDisabled = true;
            },
        },
    });

    cartridges.forEach(cartridge => {
        cartridge.addEventListener('mouseenter', (event) => {
            const target = event.target;
            if(!isSwiperDisabled){ // If swiper is not disabled (meaning a slide hadn't been clicked yet by user)
                target.style.transform = 'scale(1.15)';
                hoverSound.play(); // Play hover sound
            }
        
            //target.style.boxShadow = '0px 0px 20px rgba(255, 255, 255, 0.6)'; // Add glow effect
            //pushSiblings(target, 20);
        });

        cartridge.addEventListener('mouseleave', (event) => {
            const target = event.target;
            // Bug: Remove jerkyness when user clicks cartridge and animation plays
            target.style.transform = 'scale(1)';

            //target.style.boxShadow = 'none'; // Remove glow effect
            //pushSiblings(target, 0);
        });

        cartridge.addEventListener('click', (event) => {
            clickSound.play(); // Play click sound
            handleCartridgeClick(event.target);
        });
    });


    function handleCartridgeClick(cartridge) {
        // Remove pagination bar from view
        pagination.classList.add('pagination-disabled'); 

        // Center the clicked cartridge
        swiper.slideToClickedSlide = true; // See on:(click) above
        swiper.slidesPerView = 1;

        //flyAwaySiblings(cartridge);
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
        consoleContainer.style.bottom = '0px'; // distance from bottom of parent container
        consoleContainer.style.opacity = '1';

        consoleContainer.style.position = clickedCartridge.style.position;

        clickedCartridge.style.scale = 1.15

        clickedCartridge.classList.add('insert-cartridge');
    }

    //NEEDS IMPLIMENTED!!!!
    function loadProjectPage(clickedCartridge) {
        const projectUrl = clickedCartridge.getAttribute('data-project-url');
        if (projectUrl) {
            window.location.href = projectUrl; // Redirect to the project page
        }
    }


    // Typing animation
    typingElements.forEach((element, index) => {
        // Delay the start of each typing animation
        setTimeout(() => {
          element.classList.add('typing');
          typingSound.play();
        }, index * 225); // Adjust timing for each index of typing-text found
    });

    // function pushSiblings(target, distance) {
    //     let prev = target.previousElementSibling;
    //     let next = target.nextElementSibling;

    //     // Move previous siblings to the left
    //     while (prev) {
    //         prev.style.transform = `translateX(-${distance}px)`;
    //         prev = prev.previousElementSibling;
    //     }

    //     // Move next siblings to the right
    //     while (next) {
    //         next.style.transform = `translateX(${distance}px)`;
    //         next = next.nextElementSibling;
    //     }
    // }

    // function flyAwaySiblings(clickedCartridge) {
    //     const siblings = Array.from(clickedCartridge.parentNode.children);
    //     const clickedIndex = siblings.indexOf(clickedCartridge);
    
    //     siblings.forEach((sibling, index) => {
    //         if (index < clickedIndex) {
    //             sibling.classList.add('fly-left');
    //         } else if (index > clickedIndex) {
    //             sibling.classList.add('fly-right');
    //         }
    //     });
    // }

    
});
