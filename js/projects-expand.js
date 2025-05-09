document.addEventListener("DOMContentLoaded", function () {
    // S'assurer que l'overlay existe
    let overlay = document.querySelector('.projet-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'projet-overlay';
        document.body.appendChild(overlay);
    }

    const cards = Array.from(document.querySelectorAll(".projet-card"));
    let expandedCard = null;

    function expandCard(card) {
        if (expandedCard === card) return;
        collapseCard();

        let container = document.createElement("div");
        container.className = "projet-expanded-container";
        card.parentNode.insertBefore(container, card);
        container.appendChild(card);

        card.classList.add("expanded");
        card.setAttribute("aria-expanded", "true");
        document.body.classList.add("projet-expanded");
        expandedCard = card;

        const closeBtn = card.querySelector(".projet-close-btn");
        if (closeBtn) closeBtn.focus();

        setTimeout(() => {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
    }

    function collapseCard() {
        if (expandedCard) {
            const container = expandedCard.parentNode;
            if (container.classList.contains("projet-expanded-container")) {
                const projetsContainer = document.querySelector(".projets-container");
                projetsContainer.insertBefore(expandedCard, projetsContainer.children[0]);
                container.remove();
            }
            expandedCard.classList.remove("expanded");
            expandedCard.setAttribute("aria-expanded", "false");
            expandedCard = null;
        }
        document.body.classList.remove("projet-expanded");
    }

    // Click sur la carte pour agrandir
    cards.forEach(card => {
        card.addEventListener("click", function (e) {
            if (!card.classList.contains("expanded")) {
                expandCard(card);
            }
        });
        // Accessibilité clavier : Entrée/Espace pour ouvrir
        card.addEventListener("keydown", function (e) {
            if ((e.key === "Enter" || e.key === " ") && !card.classList.contains("expanded")) {
                e.preventDefault();
                expandCard(card);
            }
        });
    });

    // Click sur bouton close
    document.querySelectorAll(".projet-close-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            collapseCard();
        });
    });

    // Click sur overlay pour fermer
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            collapseCard();
        }
    });

    // Échap pour fermer (accessibilité)
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && expandedCard) {
            collapseCard();
        }
    });

    // Permettre l'interaction avec les boutons dans la carte agrandie
    cards.forEach(card => {
        const hover = card.querySelector(".projet-hover");
        if (hover) {
            hover.addEventListener("click", function (e) {
                const tag = e.target.tagName.toLowerCase();
                if (
                    tag === "button" ||
                    tag === "a" ||
                    tag === "input" ||
                    tag === "select" ||
                    tag === "textarea" ||
                    e.target.closest("button") ||
                    e.target.closest("a") ||
                    e.target.closest("input") ||
                    e.target.closest("select") ||
                    e.target.closest("textarea")
                ) {
                    return;
                }
                e.stopPropagation();
            });
        }
    });
});
