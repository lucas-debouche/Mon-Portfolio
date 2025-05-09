document.querySelector(".contact-form").addEventListener("submit", function (event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Tous les champs doivent être remplis.");
        event.preventDefault(); // Empêche l'envoi du formulaire si des champs sont manquants
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Veuillez fournir une adresse e-mail valide.");
        event.preventDefault();
    }
});