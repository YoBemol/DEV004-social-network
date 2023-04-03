// importamos la funcion que vamos a testear
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebaseFn from '../src/lib/firebase.js'

import { Login } from '../src/components/login.js';
import { addRoutes } from '../src/router/index.js';
//import { auth } from '../src/lib/firebaseConfig';
//import { myFunction } from '../src/lib/index';
jest.mock('../src/lib/firebase.js', () => ({
  signInWithEmailAndPassword: jest.fn()
}))
//evita problemas con alert
//jest.spyOn(window, 'alert').mockImplementation(() => { });//jorge
global.alert = () => {}
describe('login', () => {
  it.only('si usuario y contrasena son correctas lleva a home',  (done) => {
    
    //const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))//jorge
    document.body.innerHTML = '<main id="root"></main>'
    addRoutes({
      
      '/home': () => {},
    });
    
    firebaseFn.signInWithEmailAndPassword.mockResolvedValue({ user: { email: 'usuario@mail.com' } })
   /* jest.mock("firebase/auth", () => ({//jorge
      signInWithEmailAndPassword: mockSignIn//jorge
    }))//jorge*/
    
    

    const section = Login();
    
    section.querySelector('#email').value = 'usuario@mail.com';
    section.querySelector('#password').value = 'usu123';

    section.querySelector('#loginForm').dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(window.location.pathname).toBe('/home');
      
      done();
    }, 0);

    //console.log('mockSignIn', mockSignIn)
  });

  it('deberia fallar con un email invalido', async () => {

    
    const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'null' } }))//jorge
    jest.mock("firebase/auth", () => ({//jorge
      signInWithEmailAndPassword: mockSignIn//jorge
    }))//jorge

    console.log(mockSignIn)

    expect.assertions(1)
    try {
      await signInWithEmailAndPassword(mockSignIn);
    } catch (error) {
      expect(error).not.toBeNull()
    }
  })
    
}); 

