import home from './components/home.js';
import login from './components/login.js';
import join from './components/join.js';
import error from './components/error.js';
import timeline from './components/timeline.js';
import profile from './components/profile.js';
import postsByCurrentUser from './components/userPosts.js';

const root = document.getElementById('root');

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/join', component: join },
  { path: '/error', component: error },
  { path: '/timeline', component: timeline },
  { path: '/perfil', component: profile },
  { path: '/mis-posts', component: postsByCurrentUser },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) { // Si encuentra una ruta válida
    window.history.pushState({}, route.path, window.location.origin + route.path); // Actualiza la URL del navegador usando window.history.pushState()
    if (root.firstChild) {
      root.removeChild(root.firstChild); // Elimina cualquier componente existente en el elemento con ID "root"
    }
    root.append(route.component(navigateTo)); // Agrega el componente correspondiente
  } else {
    navigateTo('/error'); // Si no se encuentra una ruta válida, redirige al usuario a la página de error
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
