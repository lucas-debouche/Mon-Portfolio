function initCarousel() {
    document.querySelectorAll(".carousel-container").forEach((carouselContainer) => {
        const carousel = carouselContainer.querySelector(".carousel");
        const images = carousel.querySelectorAll(".carousel-img");
        const prevButton = carouselContainer.querySelector(".prev");
        const nextButton = carouselContainer.querySelector(".next");

        let currentIndex = 0;
        const totalImages = images.length;
        let interval = null;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        }

        function startAutoplay() {
            if (!interval) {
                interval = setInterval(nextImage, 3500);
            }
        }

        function stopAutoplay() {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        // Button events
        nextButton.addEventListener("click", function(e) {
            e.stopPropagation();
            nextImage();
        });
        prevButton.addEventListener("click", function(e) {
            e.stopPropagation();
            prevImage();
        });

        // Pause on hover/focus, resume on leave/blur
        carouselContainer.addEventListener("mouseenter", stopAutoplay);
        carouselContainer.addEventListener("mouseleave", startAutoplay);
        carouselContainer.addEventListener("focusin", stopAutoplay);
        carouselContainer.addEventListener("focusout", startAutoplay);

        // Keyboard navigation for accessibility
        [prevButton, nextButton].forEach(btn => {
            btn.addEventListener("keydown", function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    btn.click();
                }
            });
        });

        // Initialize
        updateCarousel();
        startAutoplay();
    });
}

// Auto-init if script is loaded directly
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initCarousel);
}
