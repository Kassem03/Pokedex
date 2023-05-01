import { pokemonapiURL } from './commun.js';

const clé = sessionStorage.getItem('clé');
const token = `bearer ${clé}`;
const bearerToken = token;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('pokemonId');

async function verif() {
  const reponse = await fetch(`${pokemonapiURL}/favorite?pokemonId=${id}`, {
    method: 'GET',
    headers: { authorization: bearerToken },
  });

  if (reponse.ok) {
    const data = await reponse.json();
    if (data.isFavorite === true) {
      document.getElementById('supprimerFavoris').classList.remove('is-hidden');
    } else {
      document.getElementById('ajouterFavoris').classList.remove('is-hidden');
    }
  }

  const veriff = sessionStorage.getItem('clé');
  if (veriff === null) {
    console.log('erreur');
  } else {
    document.getElementById('afficherDeconnexion').classList.remove('is-hidden');
    document.getElementById('afficherConnexion').classList.add('is-hidden');
    document.getElementById('favorites').classList.remove('is-hidden');
  }
}

function deco() {
  sessionStorage.removeItem('clé');
  window.location.href = ('./index.html');
}

document.getElementById('afficherDeconnexion').addEventListener('click', deco);

async function ajouterFavoris() {
  await fetch(`${pokemonapiURL}/favorite?pokemonId=${id}`, {
    method: 'POST',
    headers: { authorization: bearerToken },
  });
  document.getElementById('supprimerFavoris').classList.remove('is-hidden');
  document.getElementById('ajouterFavoris').classList.add('is-hidden');
}
document.getElementById('ajouterFavoris').addEventListener('click', ajouterFavoris);

async function deleteFavoris() {
  await fetch(`${pokemonapiURL}/favorite?pokemonId=${id}`, {
    method: 'DELETE',
    headers: { authorization: bearerToken },
  });
  document.getElementById('supprimerFavoris').classList.add('is-hidden');
  document.getElementById('ajouterFavoris').classList.remove('is-hidden');
}
document.getElementById('supprimerFavoris').addEventListener('click', deleteFavoris);

async function détail() {
  const reponse = await fetch(`${pokemonapiURL}/pokemon?pokemonId=${id}`);
  if (reponse.ok) {
    const data = await reponse.json();
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('hp').innerHTML = data.hp;
    document.getElementById('attack').innerHTML = data.attack;
    document.getElementById('defense').innerHTML = data.defense;
    document.getElementById('height').innerHTML = data.height;
    document.getElementById('specialattack').innerHTML = data.specialattack;
    document.getElementById('specialdefense').innerHTML = data.specialdefense;
    document.getElementById('speed').innerHTML = data.speed;
    document.getElementById('weight').innerHTML = data.weight;
    document.getElementById('imgURL').src = data.imgURL;
    document.getElementById('cryURL').src = data.cryURL;
    document.getElementById('habitatName').innerHTML = data.habitat.name;
    document.getElementById('speciesName').innerHTML = data.species.name;
    document.getElementById('evolutionName').innerHTML = data.evolution.name;
    document.getElementById('evolutionImgURL').src = data.evolution.imgURL;
    document.getElementById('evolutionEvolutionName').innerHTML = data.evolution.evolution.name;
    document.getElementById('evolutionEvolutionImgURL').src = data.evolution.evolution.imgURL;
  }
}

verif();
détail();
