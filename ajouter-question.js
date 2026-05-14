window.onload = function() {
    // 1. Récupérer les infos de l'URL envoyées par la Page 1
    const params = new URLSearchParams(window.location.search);
    const nomExamen = params.get('nom');
    const proprio = params.get('proprio');

    if (nomExamen && proprio) {
        document.getElementById('examen-concerne').value = nomExamen;
        document.getElementById('proprio-recherche').value = proprio;
    }
};

// Fonction pour ajouter un champ de texte (bouton +)
document.getElementById('btn-ajouter-liste').onclick = function() {
    const input = document.createElement('input');
    input.className = "question-texte";
    input.placeholder = "Entrez votre question...";
    input.style.cssText = "display:block; width:100%; margin:10px 0; padding:8px; border:1px solid #ccc; border-radius:4px;";
    document.getElementById('zone-questions').appendChild(input);
};

// Fonction pour enregistrer et terminer
document.getElementById('btn-terminer').onclick = function() {
    // On récupère ce qui est écrit dans les champs cachés ou visibles
    const nomCible = document.getElementById('examen-concerne').value.toLowerCase().trim();
    const proprioCible = document.getElementById('proprio-recherche').value.toLowerCase().trim();
    
    // On récupère la liste globale des examens
    let examens = JSON.parse(localStorage.getItem('examens')) || [];
    
    console.log("Recherche de l'examen pour :", nomCible, "par", proprioCible);
    console.log("Examens en mémoire :", examens);

    // 2. On cherche l'examen dans la liste
    let index = examens.findIndex(ex => 
        ex.nom.toLowerCase().trim() === nomCible && 
        ex.proprietaire.toLowerCase().trim() === proprioCible
    );

    if (index !== -1) {
        // 3. On récupère toutes les questions saisies
        const inputs = document.querySelectorAll('.question-texte');
        const nouvellesQuestions = Array.from(inputs)
            .map(i => i.value.trim())
            .filter(v => v !== ""); // On ne garde pas les cases vides

        // 4. On met à jour l'examen trouvé
        examens[index].questions = nouvellesQuestions;
        
        // 5. On sauvegarde la liste mise à jour
        localStorage.setItem('examens', JSON.stringify(examens));
        
        alert("Questions enregistrées avec succès !");
        window.location.href = "examens.html"; // Direction la page de recherche
    } else {
        // Si on arrive ici, c'est que l'examen créé en Page 1 n'est plus là
        alert("Erreur : L'examen '" + nomCible + "' est introuvable. Assurez-vous de ne pas avoir fermé votre navigateur entre la Page 1 et la Page 2.");
    }
};