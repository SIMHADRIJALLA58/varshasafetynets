/*=========================================
  AOS INITIALIZATION
=========================================*/

console.log("JavaScript is working!");

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out"
    });
}


/*=========================================
  MOBILE MENU TOGGLE
=========================================*/

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

}



/*=========================================
  MOBILE MENU + DROPDOWN
=========================================*/

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        const dropdown = this.parentElement;

        /* Services dropdown */
        if (dropdown.classList.contains("dropdown")) {

            e.preventDefault();

            dropdown.classList.toggle("active");

            return;
        }

        /* Normal links */
        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    });

});




/* ================= HERO SLIDER JS ================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroNext = document.getElementById("heroNext");
const heroPrev = document.getElementById("heroPrev");
const heroCurrent = document.getElementById("heroCurrent");
const heroSlider = document.getElementById("heroSlider");

let currentSlide = 0;
let heroTimer;

function showHeroSlide(index) {

    heroSlides[currentSlide].classList.remove("active");
    heroDots[currentSlide].classList.remove("active");

    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides[currentSlide].classList.add("active");
    heroDots[currentSlide].classList.add("active");

    heroCurrent.textContent = String(currentSlide + 1).padStart(2, "0");
    
}

function nextHeroSlide() {
    showHeroSlide(currentSlide + 1);
}

function previousHeroSlide() {
    showHeroSlide(currentSlide - 1);
}

// Automatic change every 4 seconds

function startHeroSlider() {
    stopHeroSlider();

    heroTimer = setInterval(() => {
        nextHeroSlide();
    }, 4000);
}

function stopHeroSlider() {
    clearInterval(heroTimer);
}

// Previous and Next buttons

heroNext.addEventListener("click", () => {
    nextHeroSlide();
    startHeroSlider();
});

heroPrev.addEventListener("click", () => {
    previousHeroSlide();
    startHeroSlider();
});

// Click on slide indicators

heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showHeroSlide(index);
        startHeroSlider();
    });
});

// Pause while mouse is over the slider

heroSlider.addEventListener("mouseenter", stopHeroSlider);
heroSlider.addEventListener("mouseleave", startHeroSlider);

// Pause when browser tab is hidden

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopHeroSlider();
    } else {
        startHeroSlider();
    }
});

// Start slider

startHeroSlider();








