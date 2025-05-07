
document.addEventListener("DOMContentLoaded", function () {
    // --- Animation on Scroll (AOS-like minimal) ---
    // If you use AOS, uncomment the next line and include AOS in your project
    // AOS.init();

    // Simple fade-in animation for sections/cards
    document.querySelectorAll("section, .projet-card").forEach(el => {
        el.classList.add("fade-init");
    });
    function revealOnScroll() {
        const revealEls = document.querySelectorAll(".fade-init");
        const windowHeight = window.innerHeight;
        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 60) {
                el.classList.add("fade-in");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // --- Scroll-to-top button logic ---
    let scrollBtn = document.getElementById("scrollToTop");
    if (!scrollBtn) {
        scrollBtn = document.createElement("button");
        scrollBtn.id = "scrollToTop";
        scrollBtn.setAttribute("aria-label", "Retour en haut");
        scrollBtn.innerHTML = "↑";
        scrollBtn.style.position = "fixed";
        scrollBtn.style.bottom = "32px";
        scrollBtn.style.right = "32px";
        scrollBtn.style.opacity = "0";
        scrollBtn.style.pointerEvents = "none";
        scrollBtn.style.transition = "opacity 0.3s";
        scrollBtn.style.zIndex = "999";
        scrollBtn.className = "rounded shadow";
        document.body.appendChild(scrollBtn);
    }
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.pointerEvents = "auto";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.pointerEvents = "none";
        }
    });
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- Mobile navigation toggle ---
    const nav = document.querySelector("nav ul");
    let menuToggle = document.querySelector(".menu-toggle");
    if (!menuToggle) {
        menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.innerHTML = "☰";
        nav.parentNode.insertBefore(menuToggle, nav);
    }
    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("open");
        menuToggle.setAttribute(
            "aria-label",
            nav.classList.contains("open") ? "Fermer le menu" : "Ouvrir le menu"
        );
    });
    // Fermer le menu mobile au clic extérieur ou navigation
    document.addEventListener("click", function (e) {
        if (window.innerWidth <= 700 && nav.classList.contains("open")) {
            if (!e.target.closest("nav")) {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-label", "Ouvrir le menu");
            }
        }
    });
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 700) {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-label", "Ouvrir le menu");
            }
        });
    });
});
