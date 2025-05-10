document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_z6chca6"; // Obtenez du tableau EmailJS
    const templateID = "template_6j4v41m"; // Obtenez du tableau EmailJS

    // Envoi de l'email via EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Message de succès
            const formResponse = document.getElementById("form-response");
            formResponse.style.color = "green";
            formResponse.innerText = "Votre message a été envoyé avec succès !";

            // Réinitialiser le formulaire
            document.getElementById("contact-form").reset();
        })
        .catch((err) => {
            // Message d'erreur
            const formResponse = document.getElementById("form-response");
            formResponse.style.color = "red";
            formResponse.innerText = "Une erreur s'est produite. Veuillez réessayer plus tard.";
            console.error("EmailJS Error : ", err);
        });
});
