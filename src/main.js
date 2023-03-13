// Este es el punto de entrada de tu aplicacion
import { Home } from './components/home.js';
import { Register } from './components/register.js';
import { myFunction } from './lib/index.js';
import { addRoutes, navigate } from './router/index.js';

myFunction();

addRoutes({
    '/': Home,
    '/register': Register,
    
});

//ejecuta una función tan pronto como una página haya cargado
window.onload = () => {
    navigate(window.location.pathname);
};
