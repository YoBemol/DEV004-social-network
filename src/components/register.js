import { navigate } from '../router';
//import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { createUser } from '../lib/firebase.js';
export const Register = () => {
    const registerSection = document.createElement('section');

    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = './img/hoja.png';
    
    const registerSectionTitle = document.createElement('h1');
    registerSectionTitle.textContent = 'Crea tu cuenta';

    //formulario para registrarse
    const formRegister = document.createElement('form');
    formRegister.id = 'formRegister';

    const textEmail = document.createElement('p');
    textEmail.className = 'form';
    textEmail.id = 'textEmail';
    textEmail.textContent = 'Correo electrónico';

    const inputEmail = document.createElement('input');
    inputEmail.className = 'form';
    inputEmail.id = 'userEmail';
    inputEmail.type = 'email';
    inputEmail.placeholder = 'usuario@email.com';
    inputEmail.setAttribute('required', '');

    const textPassword = document.createElement('p');
    textPassword.className = 'form';
    textPassword.id = 'textPassword';
    textPassword.textContent = 'Contraseña';

    const inputPassword = document.createElement('input');
    inputPassword.className = 'form';
    inputPassword.id = 'userPassword'
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Contraseña';
    inputPassword.setAttribute('required', '');

    const salt3 = document.createElement('br');

    const buttonRegister = document.createElement('button');
    buttonRegister.type = 'submit';
    buttonRegister.textContent = 'Registrarse';

    const salt4 = document.createElement('br');

    const btnGoBack = document.createElement('button');
    btnGoBack.textContent = 'Volver';
    btnGoBack.id = 'btnBack';

    registerSection.appendChild(logo)
    registerSection.appendChild(registerSectionTitle);
    registerSection.appendChild(formRegister);
    formRegister.appendChild(textEmail);
    formRegister.appendChild(inputEmail);
    formRegister.appendChild(textPassword);
    formRegister.appendChild(inputPassword);
    formRegister.appendChild(salt3);
    formRegister.appendChild(buttonRegister);
    formRegister.appendChild(salt4);
    formRegister.appendChild(btnGoBack);
    //vista de los inputs
    //console.log(inputEmail.value, inputPassword.value)


    //Registro de usuario primera vez, auth con Firebase
    formRegister.addEventListener('submit', async (e) => { // submit pertenece form

        e.preventDefault();
        const email = inputEmail.value;
        const password = inputPassword.value;
        //console.log(email, password)

        try {
            const createUsers = createUser(email, password)
            alert('Ingreso con éxito');
            navigate('/home');
        } catch (error) {
            //console.log(error.message) 
            //console.log(error.code)     // ayuda para el if msj error.code

            if (error.code === 'auth/email-already-in-use') {
                alert('Correo ya registrado');
            } else if (error.code === 'auth/invalid-email') {
                alert('Correo inválido');
            } else if (error.code === 'auth/weak-password') {
                alert('Contraseña débil');
            } else if (error.code) {
                alert('Algo salió mal');
            }
        }
    });


    // Regresar a login
    btnGoBack.addEventListener('click', () => navigate('/'));



    return registerSection;
};