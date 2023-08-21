import { auth } from '../firebase/initializeFirebase.js';
import {
  signOutSession,
  displayUserPosts,
} from '../lib/index.js';
import navHome from './images/home.png';
import navUser from './images/user.png';
import navPosts from './images/posts.png';
import navSignOut from './images/sign-out.png';

function postsByCurrentUser(navigateTo) {
  const user = auth.currentUser;
  displayUserPosts(user);

  const main = document.createElement('main');
  main.className = 'main-timeline';

  const pageTitle = document.createElement('h2');
  pageTitle.textContent = 'SpookyVerse';
  pageTitle.className = 'timeline-title';

  const menu = document.createElement('nav');
  menu.className = 'sidenav';

  const open = document.createElement('span');
  open.className = 'open';
  open.innerHTML = '<div></div><div></div><div></div>';
  open.addEventListener('click', () => {
    menu.style.display = 'block';
  });

  const close = document.createElement('span');
  close.className = 'gg-close-o';
  close.addEventListener('click', () => {
    menu.style.display = 'none';
  });

  const links = document.createElement('div');
  links.className = 'nav-links';

  // div-home
  const divHome = document.createElement('div');
  divHome.className = 'div-home';

  const home = document.createElement('button');
  home.textContent = 'Home';
  home.className = 'buttons-nav';

  const iconHome = document.createElement('img');
  iconHome.src = navHome;
  iconHome.className = 'icon-navbar';

  divHome.append(iconHome, home);

  // div-perfil
  const divProfile = document.createElement('div');
  divProfile.className = 'div-profile';

  const profile = document.createElement('button');
  profile.textContent = 'Mi Perfil';
  profile.className = 'buttons-nav';

  const iconProfile = document.createElement('img');
  iconProfile.src = navUser;
  iconProfile.className = 'icon-navbar';

  divProfile.append(iconProfile, profile);

  // div-mispost
  const divUserPosts = document.createElement('div');
  divUserPosts.className = 'user-posts';

  const userPosts = document.createElement('button');
  userPosts.textContent = 'Mis Posts';
  userPosts.className = 'buttons-nav';

  const iconUserPosts = document.createElement('img');
  iconUserPosts.src = navPosts;
  iconUserPosts.className = 'icon-navbar';

  divUserPosts.append(iconUserPosts, userPosts);

  // Cerrar Sesion
  const signOutDiv = document.createElement('div');
  const signOutIcon = document.createElement('img');
  const signOutButton = document.createElement('button');
  signOutDiv.className = 'sign-out-div';
  signOutButton.className = 'sign-out-button';
  signOutButton.textContent = 'Cerrar Sesión';
  signOutIcon.src = navSignOut;
  signOutIcon.className = 'icon-navbar-sign-out';
  signOutDiv.addEventListener('click', () => {
    signOutSession()
      .then(() => {
        navigateTo('/');
      })
      .catch((error) => {
        throw error;
      });
  });
  signOutDiv.append(signOutIcon, signOutButton);

  const section = document.createElement('section');
  section.className = 'main-section-user-posts';

  const postsByUser = document.createElement('div');
  postsByUser.className = 'post-by-user';

  // Modal confirmación borrar
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'SpookyVerse';
  modalTitle.className = 'modal-title';

  const modalMessage = document.createElement('p');
  modalMessage.textContent = '¿Quieres borrar este post?';

  const cancelOkButton = document.createElement('div');
  cancelOkButton.className = 'cancel-ok-button';

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Borrar';
  confirmButton.className = 'modal-btn-ok';
  confirmButton.setAttribute('type', 'button');

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'No';
  cancelButton.className = 'modal-btn-cancel';

  cancelOkButton.append(cancelButton, confirmButton);
  modalContent.append(modalTitle, modalMessage, cancelOkButton);
  modal.append(modalContent);

  // Modal para editar post
  const editBox = document.createElement('div');
  editBox.className = 'edit-box';

  const editBoxContent = document.createElement('div');
  editBoxContent.className = 'edit-box-content';

  const editForm = document.createElement('form');
  editForm.className = 'edit-form';

  const editTitle = document.createElement('input');
  editTitle.className = 'edit-title';

  const editText = document.createElement('textarea');
  editText.className = 'edit-text';

  const divButtomsModal = document.createElement('div');
  divButtomsModal.className = 'buttons-modal-edit';

  const confirmEdit = document.createElement('button');
  confirmEdit.textContent = 'Guardar';
  confirmEdit.className = 'confirm-edit';

  const cancelEdit = document.createElement('button');
  cancelEdit.textContent = 'Cancelar';
  cancelEdit.className = 'cancel-edit';

  divButtomsModal.append(cancelEdit, confirmEdit);
  editForm.append(editTitle, editText, divButtomsModal);
  editBoxContent.append(editForm);
  editBox.append(editBoxContent);

  links.append(divProfile, divHome, divUserPosts, signOutDiv);
  menu.append(close, links);
  section.append(postsByUser);
  main.append(open, menu, pageTitle, section, modal, editBox);

  // Evento para el boton mis posts en el menu
  divUserPosts.addEventListener('click', () => {
    navigateTo('/mis-posts');
  });

  divHome.addEventListener('click', () => {
    navigateTo('/timeline');
  });

  divProfile.addEventListener('click', () => {
    navigateTo('/perfil');
  });

  return main;
}

export default postsByCurrentUser;
