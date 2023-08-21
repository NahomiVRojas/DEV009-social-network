import { auth, serverTimestamp } from '../firebase/initializeFirebase.js';
import {
  signOutSession,
  createPost,
  displayAllPosts,
} from '../lib/index.js';
import navHome from './images/home.png';
import navUser from './images/user.png';
import navPosts from './images/posts.png';
import navSignOut from './images/sign-out.png';

function timeline(navigateTo) {
  displayAllPosts();

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
  section.className = 'main-section';

  const sectionTitle = document.createElement('p');
  sectionTitle.textContent = '¿Que historia quieres escribir hoy?';

  const formPost = document.createElement('form');

  const postTitle = document.createElement('input');
  postTitle.className = 'post-title';
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('placeholder', 'Ingrese un titulo');
  postTitle.setAttribute('required', '');

  const postBody = document.createElement('textarea');
  postBody.className = 'post-body';
  postBody.setAttribute('placeholder', 'Escribe tu historia aqui...');
  postBody.setAttribute('rows', '5');
  postBody.setAttribute('cols', '50');
  postBody.setAttribute('maxlength', '1500');
  postBody.setAttribute('required', '');

  const btnPost = document.createElement('button');
  btnPost.className = 'btn-post';
  btnPost.textContent = 'Post';

  const allPosts = document.createElement('div');
  allPosts.className = 'post-all-users';

  const postsByUser = document.createElement('div');
  postsByUser.className = 'post-by-user';

  links.append(divProfile, divHome, divUserPosts, signOutDiv);
  menu.append(close, links);
  formPost.append(postTitle, postBody, btnPost);
  section.append(sectionTitle, formPost, allPosts, postsByUser);
  main.append(open, menu, pageTitle, section);
  // Evento para publicar post
  formPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitle.value;
    const content = postBody.value;

    const user = auth.currentUser;
    const username = user.displayName;
    const date = serverTimestamp();

    await createPost(username, title, content, date);
    formPost.reset();
    navigateTo('/timeline');
  });

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

export default timeline;
