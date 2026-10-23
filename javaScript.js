 
 let demandes= [
  { id: 'HD-001', titre: 'Connexion Wi-Fi instable', desc: 'Le réseau se déconnecte régulièrement.', cat: 'Réseau', prio: 'Haute' },
  { id: 'HD-002', titre: "Installation d'un logiciel", desc: 'Installer un logiciel sur le poste.', cat: 'Logiciel', prio: 'Normale' },
  { id: 'HD-003', titre: 'Clavier défectueux', desc: 'Certaines touches ne fonctionnent plus.', cat: 'Matériel', prio: 'Basse' }
];

let indexmod=-1;
let idnbr = demandes.length + 1;

const container=document.getElementById('cards-container');
const countSpan = document.getElementById('Count');
const form = document.getElementById('demande-form');
let button = document.getElementById('btn-ajouter');
document.addEventListener('DOMContentLoaded', () => {

 function creerCarte(demande ,index ){
    let card = document.createElement('article');
    card.className = 'card';
    let top=document.createElement('div');
    top.className="card-top";
    let iconBox = document.createElement('div');
    iconBox.className = 'icon-box';
    let icon = document.createElement('i');
    icon.className = 'fa-solid';
    if (demande.cat === 'Réseau')
    icon.classList.add('fa-wifi');
    else if (demande.cat === 'Logiciel')
    icon.classList.add('fa-download');
    else icon.classList.add('fa-keyboard');
    iconBox.appendChild(icon);
    let idSpan = document.createElement('span');
    idSpan.className = 'card-id';
    idSpan.textContent = demande.id;
    top.appendChild(iconBox);
    top.appendChild(idSpan);
    let h3 = document.createElement('h3');
    h3.textContent = demande.titre;
    let p = document.createElement('p');
    p.textContent = demande.desc;
    let tagsDiv = document.createElement('div');
    tagsDiv.className = 'tags';
    let tagCat = document.createElement('span');
    tagCat.className = 'tag tag-gray';
    tagCat.textContent = demande.cat;
    let tagPrio = document.createElement('span');
    tagPrio.className = 'tag';
    if (demande.prio === 'Haute') tagPrio.classList.add('tag-red');
    else if (demande.prio === 'Normale') tagPrio.classList.add('tag-yellow');
    else tagPrio.classList.add('tag-green');
    tagPrio.textContent = demande.prio;
    
    // modifier
    let footer = document.createElement('div');
    footer.className = 'card-footer';
    let btnMod = document.createElement('button');
    btnMod.className = 'btn-mod';
    btnMod.textContent = ' Modifier';
    let iconMod = document.createElement('i');
    iconMod.className = 'fa-solid fa-pen';
    btnMod.prepend(iconMod);
    btnMod.addEventListener('click', () => {
      modifier(index)

 });
    // supprimer
     let btnDel = document.createElement('button');
    btnDel.className = 'btn-del';
    btnDel.textContent = ' Supprimer';
    let iconDel = document.createElement('i');
    iconDel.className = 'fa-solid fa-xmark';
    btnDel.prepend(iconDel);
    btnDel.addEventListener('click', () => {

      let confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette demande ?");
      if(confirmation){
    demandes.splice(index, 1);
    afficher();
    }
    });

    footer.appendChild(btnMod);
    footer.appendChild(btnDel);

    tagsDiv.appendChild(tagCat);
    tagsDiv.appendChild(tagPrio);

    card.appendChild(top);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(tagsDiv);
    card.appendChild(footer);
  
    return card;
 }
 function afficher() {
       container.innerHTML = '';

    for (let i = 0; i < demandes.length; i++) {
      let carte = creerCarte(demandes[i], i);
      container.appendChild(carte);
    }

    countSpan.textContent = demandes.length + ' demandes';
  }

button.addEventListener("click" , () => {
  
  let titre = document.getElementById('titre').value;
  let cat = document.getElementById('categorie').value;
  let prio = document.getElementById('priorite').value;
  let desc = document.getElementById('description').value;
    
    if(titre== ""||cat== ""||prio== ""||desc== ""){
        alert("Veuillez remplir tous les champs !");
        return;
    }
    if(indexmod===-1){
  let nouvelle = {
    id: 'HD-00' + idnbr++,
    titre: titre,
    cat: cat,
    prio: prio,
    desc: desc
  };
  demandes[demandes.length] = nouvelle;
  } else{
     demandes[indexmod].titre = titre;
    demandes[indexmod].cat = cat;
    demandes[indexmod].prio = prio;
    demandes[indexmod].desc = desc;
    indexmod = -1;
    button.textContent = 'Ajouter';
  }
  afficher();
  form.reset();
});

function modifier(index) {
  let demande = demandes[index];
  
  document.getElementById('titre').value = demande.titre;
  document.getElementById('categorie').value = demande.cat;
  document.getElementById('priorite').value = demande.prio;
  document.getElementById('description').value = demande.desc;
  
  indexmod= index; 
  button.textContent = 'Modifier';
}



  afficher();
});
