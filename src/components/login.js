import {
    loginEmail,
    loginGoogle,
} from '../lib/firebase.js';
//import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
//import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
//import { auth } from '../lib/firebase.js';
import { navigate } from '../router';

//console.log({GoogleAuthProvider})
export const Login = () => {

    const homeSection = document.createElement('section');
    homeSection.id = 'homeSection';

    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = './img/hoja.png';

    const homeSectionTitle = document.createElement('h1');
    homeSectionTitle.id = 'comment1';
    homeSectionTitle.textContent = 'Eres nueva/o en INFO NATURA?';

    const homeSectionSubTitle = document.createElement('p');
    homeSectionSubTitle.id = 'comment2';
    homeSectionSubTitle.textContent = 'Regístrate';

    //boton crear cuenta con google
    const buttonGoogle = document.createElement('button');
    buttonGoogle.type = 'button';
    buttonGoogle.id = 'googleLogin';
    buttonGoogle.textContent = 'Inicia sesión con Google';

    //boton crear cuenta con correo y contrasena 
    const buttonRegister = document.createElement('button');
    buttonRegister.type = 'button';
    buttonRegister.id = 'btnRegister';
    buttonRegister.textContent = 'Crear cuenta';    //Registrate

    const salt1 = document.createElement('br');
    const line = document.createElement('hr');

    //formulario para loguearse
    const formLogin = document.createElement('form');
    formLogin.id = 'loginForm';

    const textEmail = document.createElement('p');
    textEmail.id = 'textEmail'
    textEmail.textContent = 'Correo electrónico';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.id = 'email';
    inputEmail.placeholder = 'usuario@email.com';
    inputEmail.setAttribute('required', '');

    const textPassword = document.createElement('p');
    textPassword.id = 'textPassword';
    textPassword.textContent = 'Contraseña';

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.placeholder = 'Contraseña';
    inputPassword.setAttribute('required', '');

    const salt2 = document.createElement('br');

    const buttonLogin = document.createElement('button');
    buttonLogin.type = 'submit';
    buttonLogin.id = 'btnLogin';
    buttonLogin.textContent = 'Ingresar';

    const salt3 = document.createElement('br');

    homeSection.appendChild(logo);
    homeSection.appendChild(homeSectionTitle);
    homeSection.appendChild(homeSectionSubTitle);
    homeSection.appendChild(buttonGoogle);
    homeSection.appendChild(salt1);
    homeSection.appendChild(buttonRegister);
    homeSection.appendChild(line);
    homeSection.appendChild(formLogin);
    formLogin.appendChild(textEmail);
    formLogin.appendChild(inputEmail);
    formLogin.appendChild(textPassword);
    formLogin.appendChild(inputPassword);
    formLogin.appendChild(salt2);
    formLogin.appendChild(buttonLogin);
    homeSection.appendChild(salt3);

    //Login con google

    buttonGoogle.addEventListener('click', async (e) => {

        e.preventDefault() //cancela evento por defecto q es refrescar la pagina
        try {
            const credentials = await loginGoogle()
            console.log('cred', credentials)
            alert('Bienvenida/o ' + credentials.user.displayName);
            navigate('/home');
        } catch (error) {
            //console.log(error)
            if (error.code === 'auth/popup-closed-by-user') {
                alert('Ventana cerrada por el usuario');
            } else if (error.code) {
                alert('Algo salió mal');
            }
        }
        //falta mas if con alerts??? 
    });

    /*Ir a Register;*/

    buttonRegister.addEventListener('click', () => navigate('/register'));

    //Login con email

    formLogin.addEventListener('submit', async (e) => {

        e.preventDefault()
        const email = inputEmail.value;
        const password = inputPassword.value;
        //console.log(email, password)
        try {
            const credentials = await loginEmail(email, password);
            console.log('cred',credentials)
            alert('Bienvenida/o ' + credentials.user.email);
            navigate('/home');
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/wrong-password') {
                alert('Contraseña incorrecta');
            } else if (error.code === 'auth/user-not-found') {
                alert('Usuario no encontrado');
            } else {
                alert('Algó salio mal');
            }
        }

    })

    return homeSection;
};
