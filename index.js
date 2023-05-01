import { pokemonapiURL, Pokemons } from './commun.js';

const urlPokemon = `${pokemonapiURL}/pokemons`;
const urlSpecies = `${pokemonapiURL}/species`;
const urlHabitat = `${pokemonapiURL}/habitats`;
const urlPoketype = `${pokemonapiURL}/poketypes`;
let pokemon = null;

async function tp() {
  const reponse = await fetch(urlSpecies);
  if (reponse.ok) {
    const data = await reponse.json();
    const species = document.getElementById('species');
    for (let i = 0; i < data.length; i++) {
      species.innerHTML += `<option>${data[i].name}</option>`;
    }
  } else {
    console.log('Une erreur s\'est produite');
  }

  const reponse1 = await fetch(urlPoketype);
  if (reponse1.ok) {
    const data = await reponse1.json();
    const habitat = document.getElementById('poketypes');
    for (let i = 0; i < data.length; i++) {
      habitat.innerHTML += `<option>${data[i].name}</option>`;
    }
  } else {
    console.log('Une erreur s\'est produite');
  }

  const reponse2 = await fetch(urlHabitat);
  if (reponse2.ok) {
    const data = await reponse2.json();
    const species = document.getElementById('habitats');
    for (let i = 0; i < data.length; i++) {
      species.innerHTML += `<option>${data[i].name}</option>`;
    }
  } else {
    console.log('Une erreur s\'est produite');
  }
  const verif = sessionStorage.getItem('clé');
  if (verif == null) {
    console.log('erreur');
  } else {
    document.getElementById('afficherDeconnexion').classList.remove('is-hidden');
    document.getElementById('afficherConnexion').classList.add('is-hidden');
    document.getElementById('favorites').classList.remove('is-hidden');
  }
}
tp();

async function FiltrerPokemons() {
  const speciess = document.getElementById('species').value;
  const poketypess = document.getElementById('poketypes').value;
  const habitatss = document.getElementById('habitats').value;

  let data = pokemon;
  if (speciess !== '') {
    data = data.filter((a) => a.species.name === speciess);
  }

  if (poketypess !== '') {
    const poketypesss = [];
    data.forEach((element) => {
      element.poketypes.forEach((poketype) => {
        if (poketype.name === poketypess) {
          poketypesss.push(element);
        }
      });
    });
    data = poketypesss;
  }

  if (habitatss !== '') {
    data = data.filter((a) => a.habitat.name === habitatss);
  }

  document.getElementById('pokemons').innerHTML = Pokemons(data);
}

document.getElementById('btnFiltrer').addEventListener('click', FiltrerPokemons);

async function ObtenirPokemons() {
  const url = urlPokemon;

  // obtenir les albums
  const resultat = await fetch(url);
  if (resultat.ok) {
    pokemon = await resultat.json();
    FiltrerPokemons();
  } else {
    console.log(resultat.statusText);
  }
}

function deco() {
  sessionStorage.removeItem('clé');
  window.location.reload();
}

document.getElementById('afficherDeconnexion').addEventListener('click', deco);

ObtenirPokemons();
