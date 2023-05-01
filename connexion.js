import { pokemonapiURL } from './commun.js';

const tokenurl = `${pokemonapiURL}/auth/token`;

async function login() {
  const nomutilisateur = document.getElementById('email').value;
  const mdp = document.getElementById('password').value;

  const body = { email: nomutilisateur, password: mdp };
  console.log(body);

  const response = await fetch(tokenurl, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),

  });
  console.log(body);

  if (response.ok) {
    const data = await response.json();
    console.log(`${data.token}`);
    sessionStorage.setItem('clé', `${data.token}`);
    window.location.href = '/favorites.html';
  } else {
    console.error('une erreur sest produite');
  }
}

document.getElementById('connexion').addEventListener('click', login);
