// Variables
let list_taches = [];
let id = 0;
let isEditing = false;
let idToEdit = null;


// Ouvrir et fermer le formulaire
function ouvrirFormulaire() {
    document.getElementById("formulaireTache").classList.add("show");
}

function fermerFormulaire() {
    document.getElementById("formulaireTache").classList.remove("show");
}

// Ajouter une tâche dans la liste et dans la page
function ajouterTache() {
    try {
        const nom = document.getElementById("nomTache").value.trim();
        const description = document.getElementById("descriptionTache").value.trim();
        const deadline = document.getElementById("deadlineTache").value.replace("T", " à ");
        const priorite = document.getElementById("prioriteTache").value;

        if (!nom || !description || !deadline || !priorite) {
            throw new Error("Tous les champs sont obligatoires.");
        }

        if (isEditing) {
            // Mode édition : mise à jour de la tâche existante
            const tache = list_taches.find(t => t.id === idToEdit);
            if (tache) {
                tache.nom = nom;
                tache.description = description;
                tache.deadline = deadline;
                tache.index_priorite = priorite === "haute" ? 1 : priorite === "moyenne" ? 2 : 3;

                // Mettre à jour l'affichage de la tâche
                const elementTache = document.getElementById(`tache-${idToEdit}`);
                elementTache.querySelector("h3").textContent = nom;
                elementTache.querySelector("p").textContent = deadline;

                // Mise à jour de la couleur en fonction de la priorité
                elementTache.className = `task-item p-2 border-2 rounded-15px w-full mb-2 cursor-move ${
                    priorite === "haute"
                        ? "border-[#00bf63] shadow-[5px_5px_0_#7ed957]"
                        : priorite === "moyenne"
                        ? "border-[#ff914d] shadow-[5px_5px_0_#ffbd59]"
                        : "border-[#ff1313] shadow-[5px_5px_0_#ff5757]"
                }`;

                sauvegarderTaches();
            }
        } else {
            // Mode ajout : création d'une nouvelle tâche
            add_tache_to_page(id, nom, deadline, priorite);
            add_tache(id, nom, description, deadline, priorite);
            sauvegarderTaches();
            id++;
        }

        // Réinitialiser le mode édition
        isEditing = false;
        idToEdit = null;
        mettreAJourStatistiques();
        
        fermerFormulaire();
        document.getElementById('formNouvelleTache').reset();

        // Afficher la boîte de dialogue personnalisée
        document.getElementById("customConfirm").classList.remove("hidden");

        // Gestion des événements pour les boutons Oui et Non
        document.getElementById("confirmYes").onclick = function() {
            ouvrirFormulaire();
            document.getElementById("customConfirm").classList.add("hidden");
        };

        document.getElementById("confirmNo").onclick = function() {
            document.getElementById("customConfirm").classList.add("hidden");
        };
    } catch (error) {
        console.error(error.message);
        alert("Erreur : " + error.message);
    }
}

// Afficher les détails de la tâche
function afficherDetailsTache(idTache) {
    const tache = list_taches.find(t => t.id === idTache);
    if (tache) {
        const { nom, description, deadline, index_priorite } = tache;

        // Définir la couleur selon la priorité
        let borderColor, shadowColor;
        if (index_priorite === 1) { // Haute
            borderColor = "#00bf63";
            shadowColor = "#7ed957";
        } else if (index_priorite === 2) { // Moyenne
            borderColor = "#ff914d";
            shadowColor = "#ffbd59";
        } else { // Basse
            borderColor = "#ff1313";
            shadowColor = "#ff5757";
        }

        // Créer le contenu des détails
        document.getElementById("tacheDetailsContent").innerHTML = `
            <div style="border: 2px solid ${borderColor}; box-shadow: 5px 5px 0 ${shadowColor}; padding: 10px;">
                <h3 class="font-bold">${nom}</h3>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Date limite:</strong> ${deadline}</p>
                <p><strong>Priorité:</strong> ${index_priorite === 1 ? "Haute" : index_priorite === 2 ? "Moyenne" : "Basse"}</p>
                <p><strong>Statut:</strong> ${tache.statut}</p>
            </div>
        `;

        // Afficher le modal
        document.getElementById("detailsTache").classList.remove("hidden");
    } else {
        alert("Erreur : Tâche non trouvée.");
    }
}

// Fermer les détails de la tâche
function fermerDetailsTache() {
    document.getElementById("detailsTache").classList.add("hidden");
}

// Ajouter la tâche dans la page
function add_tache_to_page(id, nom, deadline, priorite) {
    const nouvelleTache = document.createElement("div");

    if (priorite === "haute") {
        nouvelleTache.className = `task-item p-2 border-2 border-[#00bf63] shadow-[5px_5px_0_#7ed957] rounded-15px w-full mb-2 cursor-move`;
    } else if (priorite === "moyenne") {
        nouvelleTache.className = `task-item p-2 border-2 border-[#ff914d] shadow-[5px_5px_0_#ffbd59] rounded-15px w-full mb-2 cursor-move`;
    } else {
        nouvelleTache.className = `task-item p-2 border-2 border-[#ff1313] shadow-[5px_5px_0_#ff5757] rounded-15px w-full mb-2 cursor-move`;
    }

    nouvelleTache.id = `tache-${id}`;
    nouvelleTache.setAttribute("draggable", "true");
    // nouvelleTache.setAttribute("data-deadline", deadline);
    // nouvelleTache.setAttribute("data-priorite", priorite);
    nouvelleTache.innerHTML = `
    <div class="flex justify-between items-center">
    <div class="flex items-center justify-around ">
    <img src="time-icon.png" id="time-icon" alt="tt" width="16px hight="16px" >
    <p class="text-sm text-gray-500 font_[12px] ">${deadline}</p>
    </div>
    <div>
    <button onclick="modifierTache(${id})"><img src="modifier-icon.png" alt="tt" width="16px"></button>
    <button onclick="supprimerTache(${id})"><img src="supprimer-icon.png" alt="tt" width="16px"></button>
    </div>
    </div>
    <h3 class="font-bold" onclick="afficherDetailsTache(${id})">${nom}</h3>
    `;

    nouvelleTache.addEventListener('dragstart', () => {
        nouvelleTache.classList.add('is-dragging','border-[#5271ff]','shadow-[5px_5px_0_#38b6ff]');
    });
    nouvelleTache.addEventListener('dragend', () => {
        nouvelleTache.classList.remove('is-dragging','border-[#5271ff]','shadow-[5px_5px_0_#38b6ff]');
    });

    const todoList = document.querySelector("#todo");
    todoList.appendChild(nouvelleTache);
}

//drag and drop
const allbox = document.querySelectorAll('.column');
allbox.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    box.addEventListener('drop', (e) => {
        e.preventDefault();
        const curstask = document.querySelector('.is-dragging');

        // Vérifie si la tâche est déposée dans la colonne "done"
        if (box.id === 'done') {
            const iconImg = curstask.querySelector('#time-icon');
            if (iconImg) {
                iconImg.src = "terminer.png";
                iconImg.alt = "terminé";
            }
            // Changer le statut de la tâche
            const taskId = parseInt(curstask.id.split('-')[1]); // Extrait l'ID de la chaîne 'tache-ID'
            changerStatutTache(taskId, 'done');
        } else if (box.id === 'doing') {
            // Changer le statut de la tâche à "doing"
            const taskId = parseInt(curstask.id.split('-')[1]); // Extrait l'ID de la chaîne 'tache-ID'
            changerStatutTache(taskId, 'doing');
        } else {
            // Réinitialise l'icône si elle est déplacée dans une autre colonne
            const iconImg = curstask.querySelector('#time-icon');
            if (iconImg) {
                iconImg.src = "time-icon.png";
                iconImg.alt = "tt";
            }
            // Changer le statut de la tâche à "todo"
            const taskId = parseInt(curstask.id.split('-')[1]); // Extrait l'ID de la chaîne 'tache-ID'

            changerStatutTache(taskId, 'todo');
        }

        // Ajoute la tâche à la nouvelle colonne
        box.appendChild(curstask);
        mettreAJourStatistiques();
    });
});


// Ajouter la tâche dans la liste
function add_tache(id, nom, description, deadline, priorite) {
    const index_priorite = priorite === "haute" ? 1 : priorite === "moyenne" ? 2 : 3;
    list_taches.push({ id, nom, description, deadline, index_priorite, statut: "todo" });
}

// Modifier une tâche
function modifierTache(idTache) {
    const tache = list_taches.find(t => t.id === idTache);
    if (tache) {
        document.getElementById("nomTache").value = tache.nom;
        document.getElementById("descriptionTache").value = tache.description;
        document.getElementById("deadlineTache").value = tache.deadline.replace(" à ", "T");
        document.getElementById("prioriteTache").value = tache.index_priorite === 1 ? "haute" : tache.index_priorite === 2 ? "moyenne" : "basse";
        
        // Passer en mode édition
        isEditing = true;
        idToEdit = idTache;

        ouvrirFormulaire();
        mettreAJourStatistiques();
    } else {
        alert("Erreur : Tâche non trouvée.");
    }
}


// Supprimer une tâche
function supprimerTache(idTache) {
    list_taches = list_taches.filter(tache => tache.id !== idTache);
    document.getElementById(`tache-${idTache}`).remove();
    sauvegarderTaches();
    mettreAJourStatistiques();
}


// Changer le statut de la tâche
function changerStatutTache(idTache, nouveauStatut) {
    const tache = list_taches.find(t => t.id === idTache);
    if (tache) {
        tache.statut = nouveauStatut;
        sauvegarderTaches();
    } else {
        alert("Erreur : Tâche non trouvée.");
    }
}

//Sauvegarder et restaurer les tâches
function sauvegarderTaches() {
    localStorage.setItem("list_taches", JSON.stringify(list_taches));
}

function chargerTaches() {
    const tachesSauvegardees = JSON.parse(localStorage.getItem("list_taches"));
    if (tachesSauvegardees) {
        list_taches = tachesSauvegardees;
        list_taches.forEach(tache => add_tache_to_page(tache.id, tache.nom, tache.deadline, tache.index_priorite === 1 ? "haute" : tache.index_priorite === 2 ? "moyenne" : "basse"));
    }
}

// Rechercher une tâche
function rechercherTaches() {
    const termeRecherche = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultats = list_taches.filter(tache => tache.nom.toLowerCase().includes(termeRecherche));

    const resultatsContent = document.getElementById("resultatsContent");
    resultatsContent.innerHTML = '';

    if (resultats.length > 0) {
        resultats.forEach(tache => {
            const nouvelleTache = document.createElement("div");
            let borderColor, shadowColor;
            
            // Style selon la priorité
            if (tache.index_priorite === 1) {
                borderColor = "#00bf63";
                shadowColor = "#7ed957";
            } else if (tache.index_priorite === 2) {
                borderColor = "#ff914d";
                shadowColor = "#ffbd59";
            } else {
                borderColor = "#ff1313";
                shadowColor = "#ff5757";
            }

            // Définir la structure HTML et le style de chaque tâche
            nouvelleTache.className = "task-item p-2 border-2 rounded-15px w-full mb-2 cursor-pointer";
            nouvelleTache.style.borderColor = borderColor;
            nouvelleTache.style.boxShadow = `5px 5px 0 ${shadowColor}`;
            nouvelleTache.innerHTML = `
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img src="time-icon.png" id="time-icon" alt="tt" width="16px">
                        <p class="text-sm text-gray-500 ml-2">${tache.deadline}</p>
                    </div>
                    <div>
                        <button onclick="modifierTache(${tache.id})"><img src="modifier-icon.png" alt="Modifier" width="16px"></button>
                        <button onclick="supprimerTache(${tache.id})"><img src="supprimer-icon.png" alt="Supprimer" width="16px"></button>
                    </div>
                </div>
                <h3 class="font-bold" onclick="afficherDetailsTache(${tache.id})">${tache.nom}</h3>
            `;

            resultatsContent.appendChild(nouvelleTache);
        });
    } else {
        resultatsContent.innerHTML = "<p>Aucun résultat trouvé.</p>";
    }

    document.getElementById("searchInput").value = "";

    document.getElementById("resultatsRecherche").classList.remove("hidden");
}

// Fermer la section des résultats de recherche
function fermerResultats() {
    document.getElementById("resultatsRecherche").classList.add("hidden");
}

// statistique
function mettreAJourStatistiques() {
    // Compte le nombre de tâches dans chaque colonne
    const nbTodo = document.querySelectorAll("#todo .task-item").length;
    const nbDoing = document.querySelectorAll("#doing .task-item").length;
    const nbDone = document.querySelectorAll("#done .task-item").length;

    // Met à jour le texte des titres avec le nombre de tâches
    document.getElementById("todo-title").textContent = `TO DO (${nbTodo})`;
    document.getElementById("doing-title").textContent = `DOING (${nbDoing})`;
    document.getElementById("done-title").textContent = `DONE (${nbDone})`;
}


// Initialisation au chargement de la page
window.onload = function () {
    chargerTaches();
    initialiserDragAndDrop();
};
