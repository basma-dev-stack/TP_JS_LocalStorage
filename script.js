document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-examen');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nom = document.getElementById('nom-examen').value.trim();
            const duree = document.getElementById('duree-examen').value;
            const desc = document.getElementById('description-examen').value;
            const proprio = document.getElementById('proprietaire').value.trim();

            const nouvelExamen = {
                nom: nom,
                duree: duree,
                description: desc,
                proprietaire: proprio,
                questions: []
            };

            // Sauvegarde sécurisée
            let examens = JSON.parse(localStorage.getItem('examens')) || [];
            examens.push(nouvelExamen);
            localStorage.setItem('examens', JSON.stringify(examens));

            // Redirection vers la page 2 avec les infos dans l'URL (plus sûr)
            const url = `ajouter-question.html?nom=${encodeURIComponent(nom)}&proprio=${encodeURIComponent(proprio)}`;
            alert("Examen créé avec succès !");
            window.location.href = url;
        });
    }
});