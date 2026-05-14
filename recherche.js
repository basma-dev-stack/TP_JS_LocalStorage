/**
 * Projet : Gestion d'Examens - MIP 4 Informatique
 * Fonction : Recherche et affichage dynamique des examens
 */

window.chercherExamens = function() {
    const input = document.getElementById('search-nom');
    const zone = document.getElementById('resultats');
    
    // 1. Sécurité : vérifier si les éléments HTML existent
    if (!input || !zone) {
        console.error("Éléments HTML introuvables. Vérifiez les IDs 'search-nom' et 'resultats'.");
        return;
    }

    const nomSaisi = input.value.toLowerCase().trim();
    zone.innerHTML = ""; // On vide la zone avant chaque nouvelle recherche

    // 2. Récupération des données du LocalStorage
    const donneesBrutes = localStorage.getItem('examens');
    
    if (!donneesBrutes) {
        zone.innerHTML = "<p style='color:orange; font-weight:bold;'>⚠️ Aucun examen n'est enregistré dans la mémoire du navigateur.</p>";
        return;
    }

    try {
        // 3. Conversion du texte JSON en objet JavaScript
        const examens = JSON.parse(donneesBrutes);

        // 4. Filtrage par propriétaire (insensible à la casse)
        const mesExamens = examens.filter(ex => 
            ex.proprietaire && ex.proprietaire.toLowerCase().trim() === nomSaisi
        );

        // 5. Construction de l'affichage
        if (mesExamens.length > 0) {
            mesExamens.forEach(ex => {
                const card = document.createElement('div');
                card.className = "examen-card";
                
                // Style de la carte (Border-radius et ombres pour un look moderne)
                card.style.cssText = `
                    border: 2px solid #007bff;
                    padding: 20px;
                    margin: 15px 0;
                    border-radius: 10px;
                    background-color: #ffffff;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                `;

                // Préparation de la liste des questions avec un style propre
                let questionsHTML = "";
                if (ex.questions && ex.questions.length > 0) {
                    questionsHTML = "<ul style='padding-left: 20px; color: #333;'>";
                    questionsHTML += ex.questions.map(q => `
                        <li style='margin-bottom: 8px; font-size: 15px;'>${q}</li>
                    `).join('');
                    questionsHTML += "</ul>";
                } else {
                    questionsHTML = "<p style='color: #888; font-style: italic; margin-left: 10px;'>Aucune question enregistrée pour cet examen.</p>";
                }

                // Injection du contenu dans la carte
                card.innerHTML = `
                    <h3 style="margin-top: 0; color: #007bff; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        Examen : ${ex.nom.toUpperCase()}
                    </h3>
                    <p style="margin: 10px 0;"><strong>📝 Description :</strong> ${ex.description}</p>
                    <p style="margin: 10px 0;"><strong>⏳ Durée :</strong> ${ex.duree} minutes</p>
                    <div style="margin-top: 15px;">
                        <strong>❓ Questions :</strong>
                        ${questionsHTML}
                    </div>
                `;
                
                zone.appendChild(card);
            });
        } else {
            // Message si le nom ne correspond à rien
            zone.innerHTML = `
                <div style="padding: 15px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 5px; color: #856404;">
                    Désolé, aucun examen n'a été trouvé pour le nom : <strong>${nomSaisi}</strong>
                </div>`;
        }
    } catch (erreur) {
        console.error("Erreur de lecture JSON :", erreur);
        zone.innerHTML = "<p style='color:red;'>Erreur lors de la lecture des données sauvegardées.</p>";
    }
};

// Log de confirmation dans la console
console.log("Système de recherche chargé avec succès.");