//import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { QuerySnapshot, doc } from 'firebase/firestore'; //revisar cambie Q por q --sintaxys error
import {
  logOutUser,
  saveTextContent,
  deleteContent,
  onGetContent,
} from '../lib/firebase.js';
import { navigate } from '../router';


export const Home = () => {
  const div = document.createElement('div');
  div.id = 'divHome';

  const headerHome = document.createElement('header');
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'Inicio';

  const logOut = document.createElement('button');
  logOut.textContent = 'Cerrar Sesión';
  logOut.id = 'btnlogOut';


  //formulario para crear contenido
  const formCreate = document.createElement('form');
  formCreate.id = 'loginCreate';

  const inputText = document.createElement('TEXTAREA');
  inputText.id = 'textArea';
  inputText.placeholder = 'Que esta pasando?'
  inputText.setAttribute('rows', '2');
  inputText.setAttribute('maxLength', '50');
  inputText.setAttribute('required', '');

  const salt1 = document.createElement('br');

  const createPub = document.createElement('button');
  createPub.textContent = 'Crear';
  createPub.id = 'btnCreate';

  const contentDiv = document.createElement('p');
  contentDiv.textContent = 'Muro';

  const ul = document.createElement('ul');
  ul.id = 'muro';

  const navFooter = document.createElement('nav');
  const contentNav = document.createElement('p');
  contentNav.textContent = '';

  div.appendChild(headerHome);
  headerHome.appendChild(sectionTitle);
  headerHome.appendChild(logOut);
  div.appendChild(formCreate);
  formCreate.appendChild(inputText);
  formCreate.appendChild(salt1);
  formCreate.appendChild(createPub);
  div.appendChild(contentDiv);
  div.appendChild(ul);
  div.appendChild(navFooter);
  navFooter.appendChild(contentNav);

  // Regresar a login
  logOut.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await logOutUser()
      //console.log('usuario logout')
      navigate('/');
    } catch (error) {
      if (error.code) {
        alert('Algo salió mal');
      }
    }

  });

  //form crear contenido

  formCreate.addEventListener('submit', async (e) => {
    e.preventDefault()

    const content = formCreate.textArea
    saveTextContent(content.value)

    formCreate.reset()
  })


  // crear elemento & renderizar??

  const renderContent = ((doc) => {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cont = document.createElement('span');
    let date = document.createElement('span');//crear sitio para date    
    let del = document.createElement('div');

    let user = doc.data().name == null ? 'user InfoNatura' : doc.data().name // por resolver nombre usuario
    //console.log(doc.data())

    li.setAttribute('data-id', doc.id);
    name.textContent = user;
    cont.textContent = doc.data().content;
    date.textContent = doc.data().date;
    del.textContent = 'x';//signo para eliminar publicaciones

    li.appendChild(name);
    li.appendChild(cont);
    li.appendChild(date);
    li.appendChild(del);

    ul.appendChild(li);

    //borrar publicacion 
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id')
      deleteContent(id)
    })
  });


  //listar contenido revisar 

  onGetContent((querySnapshot) => {
    //console.log(querySnapshot)
    ul.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      renderContent(doc)
    })
    
  })



  return div;
};
