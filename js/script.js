//=-=-=-=-=-=-=-= Navigation bar drop down menu =-=-=-=-=-=-=-=

// Get references to the toggle button and the dropdown menu
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarLinks = document.querySelector(".navbar-links");

// Toggle the "active" class on the dropdown menu when the toggle button is clicked
navbarToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
});
// Hide the dropdown menu when the cursor leaves the menu area
navbarLinks.addEventListener("mouseleave", () => {
    navbarLinks.classList.remove("active");
});


//=-=-=-=-=-=-=-= Portfolio dynamic scrolling =-=-=-=-=-=-=-=

let scrollAmount = 0;
const projectWidth = 340; // Adjust this width as needed
const projectsContainer = document.querySelector('.projects-container');
const projects = document.querySelectorAll('.project');

function scrollProjects(direction) {
    if (direction === 'left') {
        scrollAmount -= projectWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
    } else {
        scrollAmount += projectWidth;
        const maxScroll = (projects.length - 1) * projectWidth;
        if (scrollAmount > maxScroll) {
            scrollAmount = maxScroll;
        }
    }

    projectsContainer.style.transform = `translateX(-${scrollAmount}px)`;

    updateButtonStates();
}

function updateButtonStates() {
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    leftButton.disabled = scrollAmount === 0;
    rightButton.disabled = scrollAmount === (projects.length - 1) * projectWidth;
}

updateButtonStates();


//=-=-=-=-=-=-=-= Navigation bar retreat on scroll =-=-=-=-=-=-=-=

let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        document.querySelector(".navbar").classList.remove("scrolled");
    } else {
        document.querySelector(".navbar").classList.add("scrolled");
    }

    prevScrollPos = currentScrollPos;
});