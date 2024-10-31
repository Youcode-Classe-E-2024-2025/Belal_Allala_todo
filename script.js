//variable
const list_taches=[];
const list_taches_todo=list_taches.filter(acc);
const list_taches_doing=[];
const list_taches_done=[];


function ouvrirFormulaire(id_forme){
    document.getElementById(id_forme).classList.add("show");
}

function fermerFormulaire(){
    document.getElementById(id_forme).classList.remove("show");
}

function add_tache(id,nom,description,deadline,priorite){
    const index_priorite=0;
    if(priorite==='haute'){
        index_priorite=1;
    }else if(priorite==='moyenne'){
        index_priorite=2;
    }else{
        index_priorite=3;
    }
    list_taches.push([id,nom,description,deadline,index_priorite,1]);
}

function add_tache_to_page(nom,deadline,priorite){
    const nouvelle_Tache = document.createElement("div");
    if(priorite==='haute'){
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }else if(priorite==='moyenne'){
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }else{
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }
}

function ajouterTache() {
    const nom = document.getElementById("nomTache").value.trim();
    const description = document.getElementById("descriptionTache").value.trim();
    const deadline = document.getElementById("deadlineTache").value.replace("T", " à ");
    const priorite = document.getElementById("prioriteTache").value;

    // Crée un nouvel élément de tâche
    const nouvelle_Tache = document.createElement("div");
    if(priorite==='haute'){
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }else if(priorite==='moyenne'){
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }else{
        nouvelle_Tache.className = "task-item p-2 border border-[#5271ff]  rounded-lg shadow-[5px_5px_0_#38b6ff] w-[20px] h-[20px]"
    }
 
    // Ajoute le contenu à la tâche
    nouvelle_Tache.innerHTML = `
        <img src="ajouter_icon.png" alt="ajouter une tache class=" w-full h-auto  pr-[5px]">
        <p class="text-sm text-gray-500">${deadline}</p>
        <h3 class="font-bold">${nom}</h3>
        <p>${description}</p>
    `;

    // Ajoute la tâche dans la liste "TO DO"
    const todoList = document.querySelector("#todo .task-list");
    todoList.appendChild(nouvelle_Tache);
    fermerFormulaire();
}
