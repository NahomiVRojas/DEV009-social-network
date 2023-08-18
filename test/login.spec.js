import login from '../src/components/login.js';
import { logInWithEmail, resetPassword } from '../src/lib/index';

jest.mock('../src/lib/index', () => ({
  logInWithEmail: jest.fn((email, password) => {
    if (email === 'test@example.com' && password === '123456') {
      return Promise.resolve({ emailVerified: false });
    } return Promise.resolve({ emailVerified: true });
  }),
  resetPassword: jest.fn(() => Promise.resolve()),
}));

const navigateToMock = jest.fn();
const loginElement = login(navigateToMock);

describe('función Login', () => {
  beforeEach(() => {
    logInWithEmail.mockClear();
    resetPassword.mockClear();
  });

  test('Al hacer click tiene que ir a la pagina inicial', () => {
    const btnReturn = loginElement.querySelector('.button-return');
    btnReturn.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });

  const loginForm = loginElement.querySelector('.login-form');
  const emailInput = loginElement.querySelector('.input-login-email');
  const passwordInput = loginElement.querySelector('.input-login-password');
  const close = loginElement.querySelector('.gg-close-o');
  const modal = loginElement.querySelector('.modal');
  const modalForm = loginElement.querySelector('.modal-form');
  const modalInput = loginElement.querySelector('.modal-input');
  const modalMessage = loginElement.querySelector('p');

  emailInput.value = '';
  passwordInput.value = '123456';
  modalInput.value = 'modal@example.com';

  test('deberia dejar un usuario ingresar con correo y contraseña', async () => {
    emailInput.value = 'test@verified.com';
    passwordInput.value = '123456789';
    loginForm.submit();
    await Promise.resolve();
    expect(logInWithEmail).toHaveBeenCalledWith('test@verified.com', '123456789');
    expect(navigateToMock).toHaveBeenCalledWith('/timeline');
  });

  test('deberia mostrar mensaje de error al no verificar el correo', async () => {
    emailInput.value = 'test@example.com';
    passwordInput.value = '123456';
    logInWithEmail.mockResolvedValueOnce({ emailVerified: false });
    loginForm.submit();
    await Promise.resolve();
    setTimeout(() => {
      expect(modal.style.display).toBe('block');
      expect(modalMessage.textContent).toBe('Recuerda verificar tu correo. Si ya lo verificaste, revisa tus credenciales.');
    }, 100);
  });

  test('Deberia desplegarse una modal', () => {
    const forgotPassword = loginElement.querySelector('.forgot-password');
    forgotPassword.click();
    expect(modal.style.display).toBe('block');
  });

  test('Deberia cerrar la modal', () => {
    close.click();
    expect(modal.style.display).toBe('none');
  });

  test('deberia enviar un email para verificar el email', async () => {
    modalForm.submit();
    await Promise.resolve();
    setTimeout(() => {
      expect(resetPassword).toHaveBeenCalledWith('modal@example.com');
    }, 100);
  });

  test('deberia mostrar mensaje de error al resetear contraseña', async () => {
    resetPassword.mockRejectedValueOnce();
    modalInput.value = 'testt@example.com';
    modalForm.submit();
    await Promise.resolve();
    setTimeout(() => {
      expect(modal.style.display).toBe('block');
      expect(modalMessage.textContent).toBe('¡Que mal! Correo invalido, verifica si lo escribiste bien.');
    }, 100);
  });

  test('Al hacer click en el checkbox se puede mostrar o esconder la contraseña', () => {
    const checkbox = loginElement.querySelector('.show-password-checkbox');
    const password = loginElement.querySelector('.input-login-password');

    expect(password.type).toBe('password');

    checkbox.click();
    expect(password.type).toBe('text');

    checkbox.click();
    expect(password.type).toBe('password');
  });
});
