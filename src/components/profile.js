import { auth, onAuthStateChanged } from '../firebase/initializeFirebase.js';
import { signOutSession } from '../lib/index.js';

function profile(navigateTo) {
  const main = document.createElement('main');
  main.className = 'main-perfil';

  const pageTitle = document.createElement('h2');
  pageTitle.textContent = 'SpookyVerse';
  pageTitle.className = 'profile-title';

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
  iconHome.src = 'components/images/Home.png';
  iconHome.className = 'icon-navbar';

  divHome.append(iconHome, home);

  // div-perfil
  const divProfile = document.createElement('div');
  divProfile.className = 'div-profile';

  const profileSection = document.createElement('button');
  profileSection.textContent = 'Mi Perfil';
  profileSection.className = 'buttons-nav';

  const iconProfile = document.createElement('img');
  iconProfile.src = 'components/images/Usuario.png';
  iconProfile.className = 'icon-navbar';

  divProfile.append(iconProfile, profileSection);

  // div-mispost
  const divUserPosts = document.createElement('div');
  divUserPosts.className = 'user-posts';

  const userPosts = document.createElement('button');
  userPosts.textContent = 'Mis Posts';
  userPosts.className = 'buttons-nav';

  const iconUserPosts = document.createElement('img');
  iconUserPosts.src = 'components/images/Post.png';
  iconUserPosts.className = 'icon-navbar';

  divUserPosts.append(iconUserPosts, userPosts);

  // Cerrar Sesion
  const signOutDiv = document.createElement('div');
  const signOutIcon = document.createElement('img');
  const signOutButton = document.createElement('button');
  signOutDiv.className = 'sign-out-div';
  signOutButton.className = 'sign-out-button';
  signOutButton.textContent = 'Cerrar Sesión';
  signOutIcon.src = 'components/images/button-sign-out.png';
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

  const divInfoUser = document.createElement('div');
  divInfoUser.className = 'div-info-user';

  const allPosts = document.createElement('div');
  allPosts.className = 'post-all-users';

  const postsByUser = document.createElement('div');
  postsByUser.className = 'post-by-user';

  // Foto de usuario
  const userphoto = document.createElement('div');
  userphoto.className = 'photo-user';

  // DIV nombre usuario
  const divnametext = document.createElement('div');
  divnametext.className = 'div-name-text';

  const usernametext = document.createElement('p');
  usernametext.className = 'text-input';
  usernametext.textContent = 'Nombre';

  const username = document.createElement('p');
  username.className = 'name-user';

  // DIV email usuario
  const divemailtext = document.createElement('div');
  divemailtext.className = 'div-email-text';

  const usermailtext = document.createElement('p');
  usermailtext.className = 'text-input';
  usermailtext.textContent = 'Correo';

  const useremail = document.createElement('p');
  useremail.className = 'mail-user';

  onAuthStateChanged(auth, (user) => {
    if (user && user.photoURL) {
      const userPhotoImg = document.createElement('img');
      userPhotoImg.src = user.photoURL;
      userPhotoImg.alt = 'Foto de Usuario';
      userPhotoImg.className = 'user-photo-img';
      userphoto.appendChild(userPhotoImg);
    } if (user && !user.photoURL) {
      const sinUserPhoto = document.createElement('img');
      sinUserPhoto.src = 'components/images/logo.png';
      sinUserPhoto.className = 'user-noPhoto';
      userphoto.appendChild(sinUserPhoto);
    } if (user && user.email) {
      useremail.textContent = user.email;
    } if (user && user.displayName) {
      username.textContent = user.displayName;
    }
  });

  links.append(divProfile, divHome, divUserPosts, signOutDiv);
  divnametext.append(usernametext, username);
  divemailtext.append(usermailtext, useremail);
  divInfoUser.append(userphoto, divnametext, divemailtext);
  menu.append(close, links);
  main.append(open, menu, pageTitle, divInfoUser);

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

export default profile;
