import { navigate } from "../router";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../lib/firebase.js';
export const Register = () => {
    const registerSection = document.createElement('section');
    const registerSectionTitle = document.createElement('h1');
    registerSectionTitle.textContent = 'Crea tu cuenta';

    //formulario para registrarse
    const formRegister = document.createElement('form');
    formRegister.className = 'formRegister';

    const textEmail = document.createElement('p');
    textEmail.className = 'form';
    textEmail.id = 'textEmail'
    textEmail.textContent = 'Correo electronico';

    const inputEmail = document.createElement('input');
    inputEmail.className = 'form';
    inputEmail.id = 'userEmail'
    inputEmail.type = 'email';
    inputEmail.placeholder = 'usuario@email.com';
    inputEmail.setAttribute('required', '');

    const textPassword = document.createElement('p');
    textPassword.className = 'form';
    textPassword.id = 'textPassword'
    textPassword.textContent = 'Contraseña';

    const inputPassword = document.createElement('input');
    inputPassword.className = 'form';
    inputPassword.id = 'userPassword'
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Contraseña';
    inputPassword.setAttribute('required', '');

    const buttonRegister = document.createElement('button');
    buttonRegister.type = 'submit';
    buttonRegister.textContent = 'Registrarse';

    const btnGoBack = document.createElement('button');
    btnGoBack.textContent = 'Volver';

    registerSection.appendChild(registerSectionTitle);
    registerSection.appendChild(formRegister);
    formRegister.appendChild(textEmail);
    formRegister.appendChild(inputEmail);
    formRegister.appendChild(textPassword);
    formRegister.appendChild(inputPassword);
    formRegister.appendChild(buttonRegister);
    formRegister.appendChild(btnGoBack);
    //no pasa valores en console
    console.log(inputEmail.value, inputPassword.value)
    //event listener signup
    formRegister.addEventListener('submit', async (e) => { // submit pertenece form

        e.preventDefault();
        const email = inputEmail.value;
        const password = inputPassword.value;
        console.log(email, password)

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            //console.log(error.message) 
            //console.log(error.code)     // ayuda para el if

            if (error.code === 'auth/email-already-in-use'){
                alert('Correo ya registrado')
            } else if (error.code === 'auth/invalid-email'){
                alert('Correo invalido')
            } else if (error.code === 'auth/weak-password'){
                alert('Contraseña debil')
            } else if (error.code){
                alert('Algo salio mal')
            }
        }
    })
    // Go to home
    btnGoBack.addEventListener('click', () => navigate('/'));



    return registerSection;
};
