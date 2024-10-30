const todoList = document.getElementById('todo');
const doingList = document.getElementById('doing');
const doneList = document.getElementById('done');

// Fonction pour créer une nouvelle tâche
function createTask(taskText) {
    const newTask = document.createElement('li');
    newTask.classList.add('task');
    newTask.textContent = taskText;
    // Ajouter des fonctionnalités pour supprimer, modifier, etc.
    todoList.appendChild(newTask);
}

// Exemple d'ajout de tâches au chargement de la page
createTask('Tâche 1: Créer une maquette simple...');
createTask('Tache 2: Créer une maquette simple...');
// ...

// Ajouter des fonctionnalités pour déplacer les tâches entre les colonnes,
// modifier les tâches, supprimer les tâches, etc.