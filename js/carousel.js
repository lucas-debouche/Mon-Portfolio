function initCarousel() {
    document.querySelectorAll(".carousel-container").forEach((carouselContainer) => {
        const carousel = carouselContainer.querySelector(".carousel");
        if (!carousel) return;

        const slides = carousel.querySelectorAll(".carousel-img, img, .carousel-placeholder");
        const prevButton = carouselContainer.querySelector(".prev");
        const nextButton = carouselContainer.querySelector(".next");
        const totalImages = slides.length;

        if (totalImages === 0) return;

        let currentIndex = 0;
        let interval = null;
        let startX = 0;
        let startY = 0;
        let deltaX = 0;
        let isDragging = false;
        let isHorizontal = null;
        let suppressClick = false;

        function updateCarousel(animate) {
            if (animate === false) {
                carousel.classList.add("dragging");
            } else {
                carousel.classList.remove("dragging");
            }
            carousel.style.transform = `translateX(calc(-${currentIndex * 100}% + ${deltaX}px))`;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            deltaX = 0;
            updateCarousel(true);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            deltaX = 0;
            updateCarousel(true);
        }

        function startAutoplay() {
            if (totalImages < 2) return;
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

        function onPointerDown(clientX, clientY) {
            if (totalImages < 2) return;
            isDragging = true;
            isHorizontal = null;
            startX = clientX;
            startY = clientY;
            deltaX = 0;
            stopAutoplay();
            updateCarousel(false);
        }

        function onPointerMove(clientX, clientY, event) {
            if (!isDragging) return;

            const dx = clientX - startX;
            const dy = clientY - startY;

            if (isHorizontal === null) {
                if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
                isHorizontal = Math.abs(dx) > Math.abs(dy);
                if (!isHorizontal) {
                    isDragging = false;
                    deltaX = 0;
                    updateCarousel(true);
                    return;
                }
            }

            if (!isHorizontal) return;

            if (event && event.cancelable) event.preventDefault();
            deltaX = dx;
            updateCarousel(false);
        }

        function onPointerUp() {
            if (!isDragging) return;
            isDragging = false;

            const threshold = Math.min(80, carouselContainer.offsetWidth * 0.18);
            if (Math.abs(deltaX) > threshold) {
                suppressClick = true;
                if (deltaX < 0) nextImage();
                else prevImage();
            } else {
                deltaX = 0;
                updateCarousel(true);
            }

            startAutoplay();
            setTimeout(() => {
                suppressClick = false;
            }, 280);
        }

        if (prevButton && nextButton) {
            nextButton.addEventListener("click", function (e) {
                e.stopPropagation();
                nextImage();
                stopAutoplay();
                startAutoplay();
            });
            prevButton.addEventListener("click", function (e) {
                e.stopPropagation();
                prevImage();
                stopAutoplay();
                startAutoplay();
            });

            if (totalImages < 2) {
                prevButton.style.display = "none";
                nextButton.style.display = "none";
            }
        }

        carouselContainer.addEventListener(
            "touchstart",
            function (e) {
                if (e.touches.length !== 1) return;
                onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
            },
            { passive: true }
        );

        carouselContainer.addEventListener(
            "touchmove",
            function (e) {
                if (e.touches.length !== 1) return;
                onPointerMove(e.touches[0].clientX, e.touches[0].clientY, e);
            },
            { passive: false }
        );

        carouselContainer.addEventListener("touchend", onPointerUp, { passive: true });
        carouselContainer.addEventListener("touchcancel", onPointerUp, { passive: true });

        // Desktop drag support
        carouselContainer.addEventListener("mousedown", function (e) {
            if (e.button !== 0 || totalImages < 2) return;
            onPointerDown(e.clientX, e.clientY);

            function onMove(ev) {
                onPointerMove(ev.clientX, ev.clientY, ev);
            }

            function onUp() {
                onPointerUp();
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
            }

            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
        });

        carouselContainer.addEventListener(
            "click",
            function (e) {
                if (suppressClick) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            true
        );

        carouselContainer.addEventListener("mouseenter", stopAutoplay);
        carouselContainer.addEventListener("mouseleave", startAutoplay);
        carouselContainer.addEventListener("focusin", stopAutoplay);
        carouselContainer.addEventListener("focusout", startAutoplay);

        // Pause when tab is hidden
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        updateCarousel(true);
        startAutoplay();
    });
}

if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initCarousel);
}
