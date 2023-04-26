// importamos la funcion que vamos a testear

import firebaseFn, { onGetContent, saveTextContent } from '../src/lib/firebase.js'
import { Login } from '../src/components/login.js';
import { addRoutes } from '../src/router/index.js';
import { Register } from '../src/components/register.js';
import { Home } from '../src/components/home.js';

jest.mock('../src/lib/firebase.js', () => ({
  loginEmail: jest.fn(),
  onGetContent: jest.fn()
}))

//evita problemas con alert
//jest.spyOn(window, 'alert').mockImplementation(() => { });
global.alert = () => { }

/* ARCHIVO login.js */
describe('login', () => {
  it('si usuario y contrasena son correctas lleva a home', (done) => {

    //const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))
    //donde se inserta la vista de Login
    document.body.innerHTML = '<main id="root"></main>'
    //donde estan las rutas
    addRoutes({
      '/home': () => { },
    });
    //mock del metodo
    firebaseFn.loginEmail.mockResolvedValueOnce({ user: { email: 'usuario@mail.com' } })
    //vista de Login
    const section = Login();
    //inputs de formulario completados
    section.querySelector('#email').value = 'usuario@mail.com';
    section.querySelector('#password').value = 'usu123';
    //envio de formulario
    section.querySelector('#loginForm').dispatchEvent(new Event('submit'));
    //pasos completados debe dirigirnos a home
    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);

  });

  it('si el usuario de google es correcto lleva a home', (done) => {

    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({

      '/home': () => { },
    });

    firebaseFn.loginGoogle = jest.fn().mockResolvedValueOnce({ user: { email: 'usuario@gmail.com' } })

    /*//para mockear un constructor
    firebaseFn.GoogleAuthProvider = jest.fn().mockImplementation(() => {
      return { GoogleAuthProvider: GoogleAuthProvider };
    });*/

    const section = Login();

    section.querySelector('#googleLogin').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);

  });

  it('el boton register lleva a /register', (done) => {

    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({

      '/register': () => { },
    });

    const section = Login();

    section.querySelector('#btnRegister').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/register');

      done();
    }, 0);

  });

});

/* ARCHIVO register.js */
describe('register', () => {
  it('usuario al registrarse lo lleva a home', (done) => {

    //const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))
    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({

      '/home': () => { },
    });
    // REVISAR MOCK DE CREATE USER, SE SUPONE Q ES UN ESPACIO VACIO???
    firebaseFn.createUser = jest.fn().mockResolvedValueOnce({ user: { email: 'usu@mail.com' } })


    const section = Register();

    section.querySelector('#userEmail').value = 'usu@mail.com';
    section.querySelector('#userPassword').value = 'usu1234';

    section.querySelector('#formRegister').dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');

      done();
    }, 0);

  });

  it('el boton volver lleva a pagina principal', (done) => {

    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({

      '/': () => { },
    });

    const section = Register();

    section.querySelector('#btnBack').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/');

      done();
    }, 0);

  });

});


/* ARCHIVO home.js */
describe('home', () => {
  it('Boton cerrar sesion lleva a pagina principal', (done) => {

    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({

      '/': () => { },
    });
    // REVISAR MOCK DE CREATE USER, SE SUPONE Q ES UN ESPACIO VACIO???
    firebaseFn.logOutUser = jest.fn().mockResolvedValueOnce()

    const section = Home();

    section.querySelector('#btnlogOut').dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/');

      done();
    }, 0);

  });


  it('Funcion crear post permite crear y ensenar post', (done) => {

    //Paso 1.1 mockear funciones de firebase
    firebaseFn.onGetContent = jest.fn().mockResolvedValueOnce()
    firebaseFn.saveTextContent = jest.fn().mockResolvedValueOnce()

    //Paso 1. ir a /home
    const div = Home();
    document.body.append(div) //anade div al document

    //Opcion alternativaa para document.body.append(div) 
    /*document.body.innerHTML = '<main id="root"></main>';
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.append(div);*/
    /*//Opcion para evento click
    id.click()*/

    //Paso 2. ingresar texto de prueba
    const textArea = div.querySelector('.textArea')
    textArea.value = 'Algun texto';

    //Paso 3. enviar formulario
    div.querySelector('#loginCreate').dispatchEvent(new Event('submit'));

    //Paso 4. confirmar que el listado de publicaciones tenga el nuevo post
    setTimeout(() => {
      expect(firebaseFn.saveTextContent).toHaveBeenCalledWith('Algun texto')
      done()
    }, 0);
  });
  /*
  esta prueba fallo porque esta dentro de una funcion que tine otra funcion con una promesa
  it('Funcion borrar publicacion permite eliminar post', (done) => {
    //Paso 1.1 mockear funciones de firebase
    //firebaseFn.onGetContent = jest.fn().mockResolvedValueOnce()
    //firebaseFn.deleteContent = jest.fn().mockResolvedValueOnce()
    //console.log(firebaseFn.onGetContent())
    //Paso 1. ir a /home
    //const div = Home();
    
    //document.body.append(div);
    //const li = onGetContent()
    //document.body.append(li)
    //Paso 2. ir a 
    //Paso 2. crear elemento para eliminar un post
    
    //const del = div.querySelector('#del')
    //del.textContent = 'x';
    //console.log(del)
    //Paso 3. hacer click en eliminar dentro de un post
    //div.querySelector('#del').dispatchEvent(new Event('click'));
    //Paso 4. mockear alert para evitar porblemas global.alert = () => { } arriba linea 15
    //Paso 5. confirmar que se haya borrado el post 
    /*setTimeout(() => {
      expect(firebaseFn.deleteContent).not.toHaveBeenCalledWith('x')
      done()
    }, 0);*/

    /*Home()
    window.dispatchEvent(new Event('DOMContentLoaded'))
    const onGetMock = jest.fn(firebaseFn.onGetContent)
    
    expect(onGetMock).toHaveBeenCalled()*/

    /*document.body.innerHTML = `<main id="root"></main>`
    const homeTest = Home()
    const div = homeTest.querySelector('#muro') 
    firebaseFn.onGetContent().then((res) => res.forEach(doc => {
      div.innerHTML = doc.data().content
      expect(div.innerHTML).toBe(doc.data().content)
    }))*/
    /*
    Home()
    const onGetSpy = jest.spyOn(onGetContent, "onGetContent")
    onGetSpy()
    expect(onGetSpy).toHaveBeenCalled()
    
  })
  */
});

