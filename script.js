

// Ajouter des fonctionnalités pour déplacer les tâches entre les colonnes,
// modifier les tâches, supprimer les tâches, etc.
// Fonction pour afficher le formulaire de tâche
function ouvrirFormulaire() {
    document.getElementById("formulaireTache").classList.add("show");
}

// Fonction pour fermer le formulaire de tâche
function fermerFormulaire() {
    document.getElementById("formulaireTache").classList.remove("show");
}

// Fonction pour ajouter une nouvelle tâche
function ajouterTache() {
    // Récupère les valeurs du formulaire
    const nomTache = document.getElementById("nomTache").value.trim();
    const descriptionTache = document.getElementById("descriptionTache").value.trim();
    const deadlineTache = document.getElementById("deadlineTache").value;
    const prioriteTache = document.getElementById("prioriteTache").value;

    // Vérifie que les champs obligatoires sont remplis
    if (!nomTache || !descriptionTache || !deadlineTache) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Crée un nouvel élément de tâche
    const nouvelleTache = document.createElement("li");
    nouvelleTache.className = `task-item p-2 border rounded-md mb-2 bg-gray-100 border-${prioriteTache === 'haute' ? 'red-500' : prioriteTache === 'moyenne' ? 'yellow-500' : 'green-500'}`;
    
    // Ajoute le contenu à la tâche
    nouvelleTache.innerHTML = `
        <h3 class="font-bold">${nomTache}</h3>
        <p>${descriptionTache}</p>
        <p class="text-sm text-gray-500">Date limite : ${deadlineTache}</p>
        <p class="text-sm text-${prioriteTache === 'haute' ? 'red' : prioriteTache === 'moyenne' ? 'yellow' : 'green'}-500">Priorité : ${prioriteTache}</p>
    `;

    // Ajoute la tâche dans la liste "TO DO"
    const todoList = document.querySelector("#todo .task-list");
    todoList.appendChild(nouvelleTache);

    // Réinitialise le formulaire et ferme la modale
    document.getElementById("formNouvelleTache").reset();
    fermerFormulaire();
}
