<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération sécurisée des données du formulaire
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation simple
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("L'adresse e-mail n'est pas valide.");
    }

    // Configuration de l'e-mail
    $to = "lucas.debouche@gmail.com"; // Votre adresse e-mail
    $subject = "Nouveau message de contact depuis votre portfolio";
    $body = "Vous avez reçu un nouveau message :\n\n";
    $body .= "Nom : $name\n";
    $body .= "E-mail : $email\n";
    $body .= "Message :\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Tentative d'envoi de l'e-mail
    if (mail($to, $subject, $body, $headers)) {
    echo "Votre message a été envoyé avec succès !";
} else {
    echo "Une erreur s'est produite. Merci de réessayer.";
}
} else {
    // Redirige en cas d'accès non autorisé au script
    header("Location: index.html");
    exit;
}
?>