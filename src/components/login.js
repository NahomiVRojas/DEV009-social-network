import { logInWithEmail, resetPassword } from '../lib/index.js';
import logo from './images/logo.png';

function login(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h3');
  title.textContent = 'Ingrese al SpookyVerse';

  const logologin = document.createElement('img');
  logologin.src = logo;
  logologin.setAttribute('id', 'logo-login-join');

  const loginForm = document.createElement('form');
  loginForm.className = 'login-form';

  const emailInput = document.createElement('input');
  emailInput.className = 'input-login-email';
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electronico');
  emailInput.setAttribute('required', '');

  const passwordInput = document.createElement('input');
  passwordInput.className = 'input-login-password';
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Contraseña');
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
  btnEnter.textContent = 'Entrar';
  btnEnter.setAttribute('type', 'submit');

  const btnReturn = document.createElement('button');
  btnReturn.className = 'button-return';
  btnReturn.textContent = 'Volver';
  btnReturn.setAttribute('type', 'button');
  btnReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const forgotPassword = document.createElement('button');
  forgotPassword.setAttribute('type', 'button');
  forgotPassword.className = 'forgot-password';
  forgotPassword.textContent = 'Olvidé mi contraseña';

  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalTitleX = document.createElement('div');
  modalTitleX.className = 'modal-title-x';

  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'SpookyVerse';
  modalTitle.className = 'modal-title';

  const close = document.createElement('span');
  close.className = 'gg-close-o';

  const modalMessage = document.createElement('p');
  modalMessage.textContent = 'Enviaremos un link para que puedas crear una nueva contraseña.';

  const modalForm = document.createElement('form');
  modalForm.className = 'modal-form';

  const modalInput = document.createElement('input');
  modalInput.setAttribute('type', 'email');
  modalInput.setAttribute('placeholder', 'Correo electrónico');
  modalInput.setAttribute('required', '');
  modalInput.className = 'modal-input';

  const modalBtn = document.createElement('button');
  modalBtn.textContent = 'Enviar';
  modalBtn.className = 'modal-btn';

  modal.append(modalContent);
  modalTitleX.append(modalTitle, close);
  modalContent.append(modalTitleX, modalMessage, modalForm);
  modalForm.append(modalInput, modalBtn);

  buttonEnd.append(btnReturn, btnEnter);
  loginForm.append(emailInput, passwordInput, showPassword, buttonEnd);
  main.append(title, logologin, loginForm, forgotPassword, modal);

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    logInWithEmail(email, password)
      .then((user) => {
        if (!user.emailVerified) {
          throw new Error('Debes verificar tu correo electrónico');
        }
        navigateTo('/timeline');
      })
      .catch(() => {
        modal.style.display = 'block';
        modalMessage.textContent = 'Recuerda verificar tu correo. Si ya lo verificaste, revisa tus credenciales.';
        modalForm.remove(modalInput);
      });
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = modalInput.value;
    resetPassword(email)
      .then(() => {
        modal.style.display = 'block';
        modalMessage.textContent = '¡Listo! Revisa tu correo.';
        modalForm.remove(modalInput);
      })
      .catch(() => {
        modal.style.display = 'block';
        modalMessage.textContent = '¡Que mal! Correo invalido, verifica si lo escribiste bien.';
      });
  });

  forgotPassword.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  return main;
}

export default login;
