document.addEventListener("DOMContentLoaded", function () {
    // Header border on scroll
    const header = document.getElementById("site-header");
    function onScrollHeader() {
        if (!header) return;
        if (window.scrollY > 12) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();

    // Reveal on scroll
    function revealOnScroll() {
        const revealEls = document.querySelectorAll(".fade-init:not(.fade-in)");
        const windowHeight = window.innerHeight;
        revealEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 60) {
                el.classList.add("fade-in");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll, { passive: true });
    revealOnScroll();

    // Scroll-to-top
    let scrollBtn = document.getElementById("scrollToTop");
    if (!scrollBtn) {
        scrollBtn = document.createElement("button");
        scrollBtn.id = "scrollToTop";
        scrollBtn.type = "button";
        scrollBtn.setAttribute("aria-label", "Retour en haut");
        scrollBtn.innerHTML = "↑";
        scrollBtn.style.opacity = "0";
        scrollBtn.style.pointerEvents = "none";
        document.body.appendChild(scrollBtn);
    }
    window.addEventListener(
        "scroll",
        function () {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = "1";
                scrollBtn.style.pointerEvents = "auto";
            } else {
                scrollBtn.style.opacity = "0";
                scrollBtn.style.pointerEvents = "none";
            }
        },
        { passive: true }
    );
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Mobile nav
    const nav = document.querySelector("nav ul");
    if (!nav) return;

    let menuToggle = document.querySelector(".menu-toggle");
    if (!menuToggle) {
        menuToggle = document.createElement("button");
        menuToggle.type = "button";
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

    document.addEventListener("click", function (e) {
        if (window.innerWidth <= 800 && nav.classList.contains("open")) {
            if (!e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-label", "Ouvrir le menu");
            }
        }
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 800) {
                nav.classList.remove("open");
                menuToggle.setAttribute("aria-label", "Ouvrir le menu");
            }
        });
    });
});
