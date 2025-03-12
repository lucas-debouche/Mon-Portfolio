document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".carousel-container").forEach((carouselContainer) => {
        const carousel = carouselContainer.querySelector(".carousel");
        const images = carousel.querySelectorAll(".carousel-img");
        const prevButton = carouselContainer.querySelector(".prev");
        const nextButton = carouselContainer.querySelector(".next");

        let currentIndex = 0;
        const totalImages = images.length;

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

        nextButton.addEventListener("click", nextImage);
        prevButton.addEventListener("click", prevImage);

        let interval = setInterval(nextImage, 3000); // Défilement toutes les 3 secondes

        // Stoppe le défilement automatique quand la souris survole le carrousel
        carouselContainer.addEventListener("mouseenter", () => clearInterval(interval));

        // Relance le défilement automatique quand la souris quitte le carrousel
        carouselContainer.addEventListener("mouseleave", () => interval = setInterval(nextImage, 3000));

    });

    // Gestion de la lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".carousel-img").forEach(img => {
        img.addEventListener("click", function () {
            lightboxImg.src = this.src;
            lightbox.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("active");
    });

    // Fermer la lightbox en cliquant en dehors de l'image
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove("active");
        }
    });
});
