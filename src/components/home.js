import { logInWithGoogle } from '../lib/index.js';
import logo from './images/logo.png';

function home(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h1');
  title.textContent = 'SpookyVerse';

  const slogan = document.createElement('p');
  slogan.setAttribute('id', 'slogan-home');
  slogan.textContent = '¡Donde las pesadillas se comparten!';

  const logoImg = document.createElement('img');
  logoImg.src = logo;
  logoImg.setAttribute('id', 'logo-home');

  const login = document.createElement('button');
  login.className = 'btn-home-login';
  login.textContent = 'Iniciar Sesion';
  login.addEventListener('click', () => {
    navigateTo('/login');
  });

  const join = document.createElement('button');
  join.className = 'btn-home-join';
  join.textContent = 'Crear cuenta';
  join.addEventListener('click', () => {
    navigateTo('/join');
  });

  const loginGoogle = document.createElement('button');
  loginGoogle.className = 'btn-home-google';
  loginGoogle.textContent = 'Inicia sesión con Google';
  loginGoogle.addEventListener('click', () => {
    logInWithGoogle()
      .then(() => {
        navigateTo('/timeline');
      });
  });

  main.append(title, slogan, logoImg, login, join, loginGoogle);

  return main;
}

export default home;
