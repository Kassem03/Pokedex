import { pokemonapiURL, Pokemons } from './commun.js';

const Favurl = `${pokemonapiURL}/favorites`;
const clé = sessionStorage.getItem('clé');
const token = `bearer ${clé}`;

async function tokenn() {
  const bearerToken = token;
  const response = await fetch(Favurl, {
    method: 'GET',
    headers: { authorization: bearerToken },
  });

  if (response.ok) {
    const data = await response.json();
    document.getElementById('pokemons').innerHTML = Pokemons(data);
  } else {
    console.log('une erreur sest produite');
  }
}

function deco() {
  sessionStorage.removeItem('clé');
  window.location.href = './index.html';
}

document.getElementById('afficherDeconnexion').addEventListener('click', deco);

tokenn();
