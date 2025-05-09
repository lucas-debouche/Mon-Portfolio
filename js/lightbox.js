function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    let currentGallery = [];
    let currentIndex = 0;

    // Helper: show image at index in the gallery
    function showLightboxImage(index) {
        if (!currentGallery.length) return;
        const img = currentGallery[index];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
    }

    // Open lightbox on image click
    document.querySelectorAll(".carousel-img, .projet-card img").forEach(img => {
        img.addEventListener("click", function (e) {
            e.stopPropagation();

            // Find all images in the same carousel (if any), else just this image
            const carousel = img.closest('.carousel');
            if (carousel) {
                currentGallery = Array.from(carousel.querySelectorAll('.carousel-img'));
                currentIndex = currentGallery.indexOf(img);
            } else {
                currentGallery = [img];
                currentIndex = 0;
            }

            showLightboxImage(currentIndex);

            // Show/hide navigation arrows
            updateArrows();

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Navigation arrows (created if needed)
    function ensureArrows() {
        if (!lightbox.querySelector('.lightbox-arrow.left')) {
            const left = document.createElement('button');
            left.className = 'lightbox-arrow left';
            left.setAttribute('aria-label', 'Image précédente');
            left.innerHTML = '&lt;';
            left.addEventListener('click', function (e) {
                e.stopPropagation();
                gotoLightboxImage(-1);
            });
            lightbox.appendChild(left);
        }
        if (!lightbox.querySelector('.lightbox-arrow.right')) {
            const right = document.createElement('button');
            right.className = 'lightbox-arrow right';
            right.setAttribute('aria-label', 'Image suivante');
            right.innerHTML = '&gt;';
            right.addEventListener('click', function (e) {
                e.stopPropagation();
                gotoLightboxImage(1);
            });
            lightbox.appendChild(right);
        }
    }

    function updateArrows() {
        ensureArrows();
        const leftArrow = lightbox.querySelector('.lightbox-arrow.left');
        const rightArrow = lightbox.querySelector('.lightbox-arrow.right');
        if (currentGallery.length > 1) {
            leftArrow.style.display = '';
            rightArrow.style.display = '';
        } else {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        }
    }

    function gotoLightboxImage(delta) {
        if (!currentGallery.length) return;
        currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
        showLightboxImage(currentIndex);
    }

    // Close logic
    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        currentGallery = [];
        currentIndex = 0;
    }

    closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeLightbox();
    });

    // Click outside image closes
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") {
            closeLightbox();
        }
        if ((e.key === "ArrowLeft" || e.key === "Left") && currentGallery.length > 1) {
            gotoLightboxImage(-1);
        }
        if ((e.key === "ArrowRight" || e.key === "Right") && currentGallery.length > 1) {
            gotoLightboxImage(1);
        }
    });

    // Add minimal styles for arrows if not present
    if (!document.getElementById('lightbox-arrow-style')) {
        const style = document.createElement('style');
        style.id = 'lightbox-arrow-style';
        style.innerHTML = `
        .lightbox-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: #fff;
            border: none;
            font-size: 2.2rem;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1101;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        .lightbox-arrow.left { left: 16px; }
        .lightbox-arrow.right { right: 16px; }
        .lightbox-arrow:focus { outline: 2px solid #00bfa6; }
        @media (max-width: 600px) {
            .lightbox-arrow { font-size: 1.5rem; width: 32px; height: 32px; }
        }
        `;
        document.head.appendChild(style);
    }
}

// Auto-init if script is loaded directly
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initLightbox);
}
