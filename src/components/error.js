import logo from './images/logo.png';

function error(navigateTo) {
  const main = document.createElement('main');

  const errorMessage = document.createElement('h1');
  errorMessage.textContent = '404: Página no encontrada';

  const logoImg = document.createElement('img');
  logoImg.src = logo;
  logoImg.setAttribute('id', 'logo-home');

  const btnReturn = document.createElement('button');
  btnReturn.className = 'button-back';
  btnReturn.textContent = 'Volver a Home';
  btnReturn.setAttribute('type', 'button');
  btnReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  main.append(errorMessage, logoImg, btnReturn);

  return main;
}

export default error;
