import { navigate } from "../router";
export const Register = () => {
    const registerSection = document.createElement('section');
    const registerSectionTitle = document.createElement('h1');
    registerSectionTitle.textContent = 'Crea tu cuenta';
    
    //formulario para registrarse
    const formRegister = document.createElement('form');
    formRegister.className = 'formRegister';

    const textEmail = document.createElement('p');      
    textEmail.id = 'textEmail' 
    textEmail.textContent = 'Correo electronico';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'usuario@email.com';

    const textPassword = document.createElement('p');      
    textPassword.id = 'textPassword' 
    textPassword.textContent = 'Contrasena';

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Tu contraseña';

    const buttonRegister = document.createElement('button');    
    buttonRegister.textContent = 'Registrarse';
    
    const btnGoBack = document.createElement('button');
    btnGoBack.textContent = 'Volver';

    registerSection.appendChild(registerSectionTitle);
    registerSection.appendChild(formRegister);
    registerSection.appendChild(textEmail);
    registerSection.appendChild(inputEmail);
    registerSection.appendChild(textPassword);
    registerSection.appendChild(inputPassword);
    registerSection.appendChild(buttonRegister);
    registerSection.appendChild(btnGoBack);

    // Go to home
    btnGoBack.addEventListener('click', () => navigate('/'));

    return registerSection;
};
