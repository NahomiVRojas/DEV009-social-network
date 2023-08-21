import { createAccount } from '../lib/index.js';
import logo from './images/logo.png';

function join(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h3');
  title.textContent = 'Únete al SpookyVerse';

  const logoLogin = document.createElement('img');
  logoLogin.src = logo;
  logoLogin.setAttribute('id', 'logo-login-join');

  const joinForm = document.createElement('form');

  const userName = document.createElement('input');
  userName.className = 'input-login-join-name';
  userName.setAttribute('type', 'text');
  userName.setAttribute('placeholder', 'Nombre de usuario');
  userName.setAttribute('required', '');

  const emailInput = document.createElement('input');
  emailInput.className = 'input-login-join-email';
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electronico');
  emailInput.setAttribute('required', '');

  const passwordInput = document.createElement('input');
  passwordInput.className = 'input-login-join-password';
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Crea tu contraseña');
  passwordInput.setAttribute('minlength', '8');
  passwordInput.setAttribute('required', '');

  const showPassword = document.createElement('div');
  showPassword.className = 'show-password';

  const showPasswordText = document.createElement('label');
  showPasswordText.className = 'show-password-text';
  showPasswordText.setAttribute('for', 'password-checkbox');
  showPasswordText.textContent = 'Mostrar contraseña';

  const showPasswordCheckbox = document.createElement('input');
  showPasswordCheckbox.className = 'show-password-checkbox';
  showPasswordCheckbox.setAttribute('type', 'checkbox');
  showPasswordCheckbox.setAttribute('name', 'password-checkbox');

  showPasswordCheckbox.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password'
      ? passwordInput.type = 'text'
      : passwordInput.type = 'password';
  });

  showPassword.append(showPasswordCheckbox, showPasswordText);

  const buttonEnd = document.createElement('div');
  buttonEnd.className = 'button-end';

  const btnEnter = document.createElement('button');
  btnEnter.className = 'button-login';
  btnEnter.textContent = 'Crear';
  btnEnter.setAttribute('type', 'submit');

  const btnReturn = document.createElement('button');
  btnReturn.className = 'button-return';
  btnReturn.textContent = 'Volver';
  btnReturn.setAttribute('type', 'button');
  btnReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'SpookyVerse';
  modalTitle.className = 'modal-title';

  const close = document.createElement('span');
  close.className = 'gg-close-o';

  const modalMessage = document.createElement('p');
  modalMessage.textContent = 'Ingrese a tu correo para verificar tu cuenta.';

  modal.append(modalContent);
  modalContent.append(modalTitle, close, modalMessage);

  buttonEnd.append(btnReturn, btnEnter);
  joinForm.append(userName, emailInput, passwordInput, showPassword, buttonEnd);
  main.append(title, logoLogin, joinForm, modal);

  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const username = userName.value;
    createAccount(email, password, username)
      .then(() => {
        modal.style.display = 'block';
      })
      .catch(() => {
        modal.style.display = 'block';
        modalMessage.textContent = 'Ya existe una cuenta para ese correo electrónico o el correo es inválido.';
      });
  });
  close.addEventListener('click', () => {
    modal.style.display = 'none';
    navigateTo('/login');
  });

  return main;
}

export default join;
