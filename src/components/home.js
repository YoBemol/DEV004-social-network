//import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
//import { QuerySnapshot, doc } from 'firebase/firestore'; 
import {
  logOutUser,
  saveTextContent,
  deleteContent,
  onGetContent,
  getContent,
  updateContent,
  auth
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

  const inputText = document.createElement('textarea');
  inputText.classList.add('textArea');
  inputText.id = 'inputText';
  inputText.placeholder = 'Que esta pasando?'
  inputText.setAttribute('rows', '2');
  inputText.setAttribute('maxLength', '250');
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
    //console.log("enviar form"); // aux para test
    const content = document.getElementsByClassName('textArea')[0];
    //console.log(content) //formCreate.textArea
    saveTextContent(content.value)

    formCreate.reset()
  })


  // crear elemento & renderizar??

  const renderContent = ((doc) => {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cont = document.createElement('span');
    let contEdit = document.createElement('textarea');
    let date = document.createElement('span');  
    let edit = document.createElement('button');
    let save = document.createElement('button');
    let cancel = document.createElement('button');
    let del = document.createElement('div');
    del.id = 'del';

    let user = doc.data().name == null ? doc.data().email || 'userINFO' : doc.data().name
    //console.log(doc.data())

    li.setAttribute('data-id', doc.id);
    li.setAttribute('data-userid', doc.data().uid);
    contEdit.setAttribute('class', 'oculto');

    name.textContent = user;
    cont.textContent = doc.data().content;
    contEdit.textContent = doc.data().content;
    date.textContent = doc.data().date;
    edit.textContent = 'Editar';
    save.textContent = 'Guardar';
    cancel.textContent = 'Cancelar';
    del.textContent = 'x';//signo para eliminar publicaciones

    li.appendChild(name);
    li.appendChild(cont);
    li.appendChild(contEdit);
    li.appendChild(date);

    //delete y edit visible solo para user signin
    if (doc.data().uid === auth.currentUser.uid) {

      li.appendChild(del);
      li.appendChild(edit);
      li.appendChild(save);
      li.appendChild(cancel);

      save.setAttribute('class', 'oculto');
      cancel.setAttribute('class', 'oculto');

    }
    ul.appendChild(li);

    //borrar publicacion 
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('PRUEBA')
      let id = e.target.parentElement.getAttribute('data-id')
      const option = confirm('Estas segura/o de eliminar este post?');
      if (option == true) {
        deleteContent(id)
      }

    })



    //editar publicacion 
    edit.addEventListener('click', async (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id')
      const info = await getContent(id) // revisar si es necesario ya que use doc.data().content; (el mismo valor q en cont)
      console.log('editar');

      edit.setAttribute('class', 'oculto');
      cont.setAttribute('class', 'oculto');
      contEdit.setAttribute('class', 'visible');
      save.setAttribute('class', 'visible');
      cancel.setAttribute('class', 'visible');


      console.log('contEditvalue', contEdit.value);


      /*
      let opcion = (prompt('Texto a editar', `${cont.data().content}`));

      if (opcion !== null || opcion !== "") {
        updateContent(id,{content: opcion}) 
      }
      */
    });
    //eventos de editar guardar y cancelar
    save.addEventListener('click', async (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id')
      console.log('guardar');
      if (contEdit.value !== null || contEdit.value !== "") {
        await updateContent(id, { content: contEdit.value });
        cancel.setAttribute('class', 'oculto');
        save.setAttribute('class', 'oculto');
        cont.setAttribute('class', 'visible');
        edit.setAttribute('class', 'visible');
      }

    })

    cancel.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('cancelar');
      edit.setAttribute('class', 'visible');
      cont.setAttribute('class', 'visible');
      contEdit.setAttribute('class', 'oculto');
      cancel.setAttribute('class', 'oculto');
      save.setAttribute('class', 'oculto');
    })
  });



  //listar contenido revisar 

  onGetContent((querySnapshot) => {
    //console.log(querySnapshot)
    ul.innerHTML = '';
    querySnapshot.forEach((doc) => {
      //console.log(doc.data())
      renderContent(doc)
    })

  })



  return div;
};
