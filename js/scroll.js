function initScrollToTop() {
    // Crée le bouton si absent
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

    // Affiche/masque le bouton selon la position de scroll
    function toggleScrollBtn() {
        if (window.scrollY > 100) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.pointerEvents = "auto";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.pointerEvents = "none";
        }
    }

    window.addEventListener("scroll", toggleScrollBtn);
    toggleScrollBtn();

    // Scroll fluide vers le haut au clic
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Auto-init si chargé directement
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initScrollToTop);
}
