document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector('.projet-overlay') || document.createElement('div');
    overlay.className = 'projet-overlay';
    document.body.appendChild(overlay);

    const cards = Array.from(document.querySelectorAll(".projet-card"));
    let expandedCard = null;

    function expandCard(card) {
        if (expandedCard === card) return;

        collapseCard(); // Replier la carte précédemment agrandie, si existante
        card.classList.add("expanded"); // Ajoute la classe pour agrandir
        card.setAttribute("aria-expanded", "true"); // Marquer comme agrandie pour les lecteurs d’écran/accessibilité
        document.body.classList.add("projet-expanded");
        expandedCard = card;

        const closeBtn = card.querySelector(".projet-close-btn");
        if (closeBtn) closeBtn.focus();

        // Centrer la carte dans la vue (facultatif)
        setTimeout(() => {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    }

    function collapseCard() {
        if (expandedCard) {
            expandedCard.classList.remove("expanded");
            expandedCard.setAttribute("aria-expanded", "false");
            expandedCard = null; // Réinitialiser la carte agrandie
        }
        document.body.classList.remove("projet-expanded");
    }

    // Ajouter événement "click" pour agrandir les cartes
    cards.forEach(card => {
        card.addEventListener("click", function () {
            if (!card.classList.contains("expanded")) {
                expandCard(card);
            }
        });

        // Accessibilité : Détecter entrée ou espace pour agrandir
        card.addEventListener("keydown", function (e) {
            if ((e.key === "Enter" || e.key === " ") && !card.classList.contains("expanded")) {
                e.preventDefault();
                expandCard(card);
            }
        });
    });

    // Ajout des événements pour les fermetures
    overlay.addEventListener("click", collapseCard);

    document.querySelectorAll(".projet-close-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            collapseCard();
        });
    });

    // Événement clavier : "Escape" pour fermer
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && expandedCard) {
            collapseCard();
        }
    });
});