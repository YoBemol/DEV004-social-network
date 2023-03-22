import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { auth } from '../lib/firebase.js';
import { navigate } from "../router";
export const Login = () => {

    const homeSection = document.createElement('section');
    homeSection.className = 'section'

    const homeSectionTitle = document.createElement('p');
    homeSectionTitle.id = 'comment1'
    homeSectionTitle.textContent = 'Eres nueva/o en INFO NATURA?';

    const homeSectionSubTitle = document.createElement('p');
    homeSectionSubTitle.id = 'comment2'
    homeSectionSubTitle.textContent = 'Registrate';

    //boton crear cuenta con google
    const buttonGoogle = document.createElement('button');
    buttonGoogle.type = 'button';
    buttonGoogle.id = 'googleLogin';
    buttonGoogle.textContent = 'Inicia sesion con Google';

    //boton crear cuenta con correo y contrasena 
    const buttonRegister = document.createElement('button');
    buttonRegister.type = 'button';
    buttonRegister.textContent = 'Crear cuenta';    //Registrate

    const line = document.createElement('hr');

    //formulario para loguearse
    const formLogin = document.createElement('form');
    formLogin.id = 'loginForm';

    const textEmail = document.createElement('p');
    textEmail.id = 'textEmail'
    textEmail.textContent = 'Correo electronico';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'usuario@email.com';

    const textPassword = document.createElement('p');
    textPassword.id = 'textPassword'
    textPassword.textContent = 'Contraseña';

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Contraseña';

    const buttonLogin = document.createElement('button');
    buttonLogin.type = 'submit';
    buttonLogin.textContent = 'Ingresar';


    homeSection.appendChild(homeSectionTitle);
    homeSection.appendChild(homeSectionSubTitle);
    homeSection.appendChild(buttonGoogle);
    homeSection.appendChild(buttonRegister);
    homeSection.appendChild(line);
    homeSection.appendChild(formLogin);
    formLogin.appendChild(textEmail);
    formLogin.appendChild(inputEmail);
    formLogin.appendChild(textPassword);
    formLogin.appendChild(inputPassword);
    formLogin.appendChild(buttonLogin);

    //Login con google

    buttonGoogle.addEventListener('click', async () => {

        const provider = new GoogleAuthProvider(); // instancia es una clase q va a devolver un objeto

        try {
            const credentials = await signInWithPopup(auth, provider)
            console.log(credentials)
            alert('Bienvenida/o ' + credentials.user.displayName)
            navigate('/home')
        } catch (error) {
            //console.log(error)
            if (error.code === 'auth/popup-closed-by-user') {
                alert('Ventana cerrada por el usuario')
            } else if (error.code) {
                alert('Algo salio mal')
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

        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password)
            console.log(credentials)
            alert('Bienvenida/o ' + credentials.user.email)
            navigate('/home')
        } catch (error) {
            //console.log(error)
            if (error.code === 'auth/wrong-password') {
                alert('Contraseña incorrecta')
            } else if (error.code === 'auth/user-not-found') {
                alert('Usuario no encontrado')
            } else {
                alert('Algo salio mal')
            }
        }

    })

    return homeSection;
};
