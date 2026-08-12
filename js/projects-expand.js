document.addEventListener("DOMContentLoaded", function () {
    let overlay = document.querySelector(".projet-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "projet-overlay";
        document.body.appendChild(overlay);
    }

    const cards = Array.from(document.querySelectorAll(".projet-card"));
    let expandedCard = null;
    let scrollY = 0;
    let isLocked = false;

    function lockScroll() {
        if (isLocked) return;
        scrollY = window.scrollY || window.pageYOffset;
        document.documentElement.classList.add("projet-expanded");
        document.body.classList.add("projet-expanded");
        document.body.style.top = `-${scrollY}px`;
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        isLocked = true;
    }

    function unlockScroll() {
        if (!isLocked) return;
        document.documentElement.classList.remove("projet-expanded");
        document.body.classList.remove("projet-expanded");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
        isLocked = false;
    }

    function expandCard(card) {
        if (expandedCard === card) return;

        collapseCard();
        card.classList.add("expanded");
        card.setAttribute("aria-expanded", "true");
        lockScroll();
        overlay.classList.add("active");
        expandedCard = card;

        const closeBtn = card.querySelector(".projet-close-btn");
        if (closeBtn) closeBtn.focus();
    }

    function collapseCard() {
        if (expandedCard) {
            expandedCard.classList.remove("expanded");
            expandedCard.setAttribute("aria-expanded", "false");
            expandedCard = null;
        }
        unlockScroll();
        overlay.classList.remove("active");
    }

    cards.forEach((card) => {
        card.addEventListener("click", function (e) {
            if (e.target.closest(".projet-close-btn")) return;
            if (e.target.closest(".carousel-container")) return;
            if (e.target.closest(".projet-github")) return;
            if (!card.classList.contains("expanded")) {
                expandCard(card);
            }
        });

        card.addEventListener("keydown", function (e) {
            if ((e.key === "Enter" || e.key === " ") && !card.classList.contains("expanded")) {
                e.preventDefault();
                expandCard(card);
            }
        });
    });

    overlay.addEventListener("click", collapseCard);

    document.querySelectorAll(".projet-close-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            collapseCard();
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && expandedCard) {
            collapseCard();
        }
    });
});
