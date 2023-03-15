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
    buttonGoogle.textContent = 'Inicia sesion con Google';

    //boton crear cuenta con correo y contrasena 
    const buttonRegister = document.createElement('button');
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
    textPassword.textContent = 'Contrasena';

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Tu contraseña';

    const buttonLogin = document.createElement('button'); 
    buttonLogin.type = 'submit';   
    buttonLogin.textContent = 'Ingresar';

        
           //Ingresar
    /*const homeFooter = document.createElement('footer');
    const homeFooterParagraph = document.createElement('p');
    homeFooterParagraph.textContent = 'Botanico icono creado por hemannkumar - Flaticon';*/

    buttonRegister.addEventListener('click', () => navigate('/register'));

    homeSection.appendChild(homeSectionTitle);
    homeSection.appendChild(homeSectionSubTitle);
    homeSection.appendChild(buttonGoogle);
    homeSection.appendChild(buttonRegister);
    homeSection.appendChild(line);
    homeSection.appendChild(formLogin);
    homeSection.appendChild(textEmail);
    homeSection.appendChild(inputEmail);
    homeSection.appendChild(textPassword);
    homeSection.appendChild(inputPassword);
    homeSection.appendChild(buttonLogin);

    return homeSection;
};
