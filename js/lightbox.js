function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    if (!lightbox || !lightboxImg || !closeBtn) return;

    let currentGallery = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchDeltaX = 0;

    function showLightboxImage(index) {
        if (!currentGallery.length) return;
        const img = currentGallery[index];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
    }

    document.querySelectorAll(".carousel-img, .projet-card img").forEach((img) => {
        img.addEventListener("click", function (e) {
            e.stopPropagation();

            const carousel = img.closest(".carousel");
            if (carousel) {
                currentGallery = Array.from(carousel.querySelectorAll(".carousel-img"));
                currentIndex = currentGallery.indexOf(img);
            } else {
                currentGallery = [img];
                currentIndex = 0;
            }

            showLightboxImage(currentIndex);
            updateArrows();
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    function ensureArrows() {
        if (!lightbox.querySelector(".lightbox-arrow.left")) {
            const left = document.createElement("button");
            left.type = "button";
            left.className = "lightbox-arrow left";
            left.setAttribute("aria-label", "Image précédente");
            left.innerHTML = "&lt;";
            left.addEventListener("click", function (e) {
                e.stopPropagation();
                gotoLightboxImage(-1);
            });
            lightbox.appendChild(left);
        }
        if (!lightbox.querySelector(".lightbox-arrow.right")) {
            const right = document.createElement("button");
            right.type = "button";
            right.className = "lightbox-arrow right";
            right.setAttribute("aria-label", "Image suivante");
            right.innerHTML = "&gt;";
            right.addEventListener("click", function (e) {
                e.stopPropagation();
                gotoLightboxImage(1);
            });
            lightbox.appendChild(right);
        }
    }

    function updateArrows() {
        ensureArrows();
        const leftArrow = lightbox.querySelector(".lightbox-arrow.left");
        const rightArrow = lightbox.querySelector(".lightbox-arrow.right");
        const show = currentGallery.length > 1;
        leftArrow.style.display = show ? "" : "none";
        rightArrow.style.display = show ? "" : "none";
    }

    function gotoLightboxImage(delta) {
        if (!currentGallery.length) return;
        currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
        showLightboxImage(currentIndex);
    }

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

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if ((e.key === "ArrowLeft" || e.key === "Left") && currentGallery.length > 1) {
            gotoLightboxImage(-1);
        }
        if ((e.key === "ArrowRight" || e.key === "Right") && currentGallery.length > 1) {
            gotoLightboxImage(1);
        }
    });

    lightbox.addEventListener(
        "touchstart",
        function (e) {
            if (e.touches.length !== 1 || currentGallery.length < 2) return;
            touchStartX = e.touches[0].clientX;
            touchDeltaX = 0;
        },
        { passive: true }
    );

    lightbox.addEventListener(
        "touchmove",
        function (e) {
            if (!touchStartX || e.touches.length !== 1) return;
            touchDeltaX = e.touches[0].clientX - touchStartX;
        },
        { passive: true }
    );

    lightbox.addEventListener(
        "touchend",
        function () {
            if (Math.abs(touchDeltaX) > 50 && currentGallery.length > 1) {
                gotoLightboxImage(touchDeltaX < 0 ? 1 : -1);
            }
            touchStartX = 0;
            touchDeltaX = 0;
        },
        { passive: true }
    );

    if (!document.getElementById("lightbox-arrow-style")) {
        const style = document.createElement("style");
        style.id = "lightbox-arrow-style";
        style.innerHTML = `
        .lightbox-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: #fff;
            border: none;
            font-size: 2.2rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1101;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .lightbox-arrow.left { left: max(12px, env(safe-area-inset-left, 0px)); }
        .lightbox-arrow.right { right: max(12px, env(safe-area-inset-right, 0px)); }
        .lightbox-arrow:focus { outline: 2px solid #FF6B35; }
        @media (max-width: 600px) {
            .lightbox-arrow { font-size: 1.5rem; width: 44px; height: 44px; }
        }
        `;
        document.head.appendChild(style);
    }
}

if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initLightbox);
}
