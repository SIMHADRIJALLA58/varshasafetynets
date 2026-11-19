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
 AOS.init({
        duration: 900,
        once: true,
        offset: 80
    });

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








document.querySelectorAll('.faq-question').forEach(button => {

    button.addEventListener('click', function () {

        const currentItem = this.closest('.faq-item');
        const isActive = currentItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question')
                .setAttribute('aria-expanded', 'false');
            item.querySelector('.faq-icon').textContent = '+';
        });

        if (!isActive) {
            currentItem.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            this.querySelector('.faq-icon').textContent = '×';
        }

    });

});





document.getElementById("varshaFooterYear").textContent =
    new Date().getFullYear();

document.getElementById("varshaSimpleForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const mobile = document.getElementById("varshaSimpleMobile").value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    const whatsappNumber = "919591222171";

    const message = "Hello Varsha Safety Nets, I need a callback. My mobile number is " + mobile;

    window.open(
        "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message),
        "_blank"
    );
});



document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("lasyaWhatsAppForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("lasyaName").value.trim();
        const phone = document.getElementById("lasyaPhone").value.trim();
        const service = document.getElementById("lasyaService").value;
        const message = document.getElementById("lasyaMessage").value.trim();

        // Name Validation
        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        // Mobile Number Validation
        if (!/^[6-9][0-9]{9}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Service Validation
        if (service === "") {
            alert("Please select your required service.");
            return;
        }

        // Varsha Safety Nets WhatsApp Number
        const businessNumber = "919591222171";

        // WhatsApp Message
        const whatsappMessage =
`Hello Varsha Safety Nets,

I would like to request a free quotation for your services.

*CUSTOMER DETAILS*

*Name:* ${name}
*Phone Number:* ${phone}
*Required Service:* ${service}
*Location & Requirements:* ${message || "Not provided"}

Please share the pricing, material options and installation details.

Thank you!

Website: https://varshasafetynets.in/`;

        // Generate WhatsApp URL
        const whatsappURL =
            "https://wa.me/" + businessNumber +
            "?text=" + encodeURIComponent(whatsappMessage);

        // Redirect to WhatsApp
        window.location.href = whatsappURL;

    });

});




/* ==========================================
   GALLERY FILTER & IMAGE LIGHTBOX
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".anr-gallery");

    if (!gallery) return;

    const filterButtons = gallery.querySelectorAll(".filter-btn");
    const galleryItems = gallery.querySelectorAll(".gallery-item");
    const galleryCards = gallery.querySelectorAll(".gallery-card");

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCounter = document.getElementById("lightboxCounter");

    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;
    let visibleImages = [];
    let previousOverflow = "";


    /* ==========================================
       GALLERY FILTER
    ========================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {

                if (filter === "all" || item.dataset.category === filter) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }

        });

    });


    /* ==========================================
       OPEN IMAGE LIGHTBOX
    ========================================== */

    galleryCards.forEach(card => {

        card.addEventListener("click", function (event) {

            event.preventDefault();

            visibleImages = Array.from(galleryCards).filter(item => {

                return item.closest(".gallery-item").style.display !== "none";

            });

            currentIndex = visibleImages.indexOf(this);

            openLightbox();

        });

    });


    function openLightbox() {

        updateImage();

        lightbox.classList.add("active");

        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        closeBtn.focus();

    }


    /* ==========================================
       UPDATE IMAGE
    ========================================== */

    function updateImage() {

        const image = visibleImages[currentIndex].querySelector("img");

        /* Automatically use actual image path */

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${visibleImages.length}`;

    }


    /* ==========================================
       NEXT IMAGE
    ========================================== */

    function nextImage() {

        currentIndex =
            (currentIndex + 1) % visibleImages.length;

        updateImage();

    }


    /* ==========================================
       PREVIOUS IMAGE
    ========================================== */

    function previousImage() {

        currentIndex =
            (currentIndex - 1 + visibleImages.length)
            % visibleImages.length;

        updateImage();

    }


    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", previousImage);


    /* ==========================================
       CLOSE LIGHTBOX
    ========================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = previousOverflow;

        visibleImages[currentIndex]?.focus();

    }

    closeBtn.addEventListener("click", closeLightbox);


    /* Close when clicking outside the image */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* ==========================================
       KEYBOARD CONTROLS
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });


    /* ==========================================
       MOBILE SWIPE SUPPORT
    ========================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    lightboxImage.addEventListener("touchstart", function (event) {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    lightboxImage.addEventListener("touchend", function (event) {

        touchEndX = event.changedTouches[0].screenX;

        if (touchStartX - touchEndX > 50) {

            nextImage();

        }

        if (touchEndX - touchStartX > 50) {

            previousImage();

        }

    }, { passive: true });

});