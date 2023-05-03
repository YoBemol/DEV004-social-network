//  import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
//  import { QuerySnapshot, doc } from 'firebase/firestore';
import {
  logOutUser,
  saveTextContent,
  deleteContent,
  onGetContent,
  getContent,
  updateContent,
  auth,
} from '../lib/firebase.js';
import { navigate } from '../router';

export const Home = () => {
  const div = document.createElement('div');
  div.id = 'divHome';

  const headerHome = document.createElement('header');
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = '⬆nicio';
  sectionTitle.id = 'goToTop';

  const logOut = document.createElement('button');
  logOut.textContent = 'Cerrar';
  logOut.id = 'btnlogOut';

  //  formulario para crear contenido
  const formCreate = document.createElement('form');
  formCreate.id = 'loginCreate';

  const inputText = document.createElement('textarea');
  inputText.classList.add('textArea');//  inputText.className='textArea'
  inputText.id = 'inputText';
  inputText.placeholder = 'Que esta pasando?';
  inputText.setAttribute('rows', '2');
  inputText.setAttribute('maxLength', '250');
  inputText.setAttribute('required', '');

  const createPub = document.createElement('button');
  createPub.textContent = 'Crear';
  createPub.id = 'btnCreate';

  //  contenedor para renderContent()
  const ul = document.createElement('ul');
  ul.id = 'muro';

  const navFooter = document.createElement('nav');
  const contentNav = document.createElement('p');
  contentNav.textContent = 'Creado con ❤ por Belen Molina';

  div.appendChild(headerHome);
  headerHome.appendChild(sectionTitle);
  headerHome.appendChild(logOut);
  div.appendChild(formCreate);
  formCreate.appendChild(inputText);
  formCreate.appendChild(createPub);
  div.appendChild(ul);
  div.appendChild(navFooter);
  navFooter.appendChild(contentNav);

  //  Regresar a login
  logOut.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await logOutUser();
      //  console.log('usuario logout')
      navigate('/');
    } catch (error) {
      if (error.code) {
        alert('Algo salió mal');
      }
    }
  });

  // crear elemento & renderizar??

  const renderContent = ((doc) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const cont = document.createElement('span');
    const contEdit = document.createElement('textarea');
    const date = document.createElement('span');
    const edit = document.createElement('button');
    const save = document.createElement('button');
    const cancel = document.createElement('button');
    const del = document.createElement('div');
    name.id = 'name';
    save.id = 'btnSave';
    cancel.id = 'btnCancel';
    del.id = 'del';

    const user = doc.data().name == null ? doc.data().email || 'userINFO' : doc.data().name;
    //  console.log(doc.data())

    li.setAttribute('data-id', doc.id);
    li.setAttribute('data-userid', doc.data().uid);
    contEdit.setAttribute('class', 'oculto');

    name.textContent = user;
    cont.textContent = doc.data().content;
    contEdit.textContent = doc.data().content;
    date.textContent = doc.data().dateCreate.toDate();
    edit.textContent = 'Editar';
    save.textContent = 'Guardar ✔';
    cancel.textContent = 'Cancelar ✘';
    del.textContent = 'x';//  signo para eliminar publicaciones

    li.appendChild(name);
    li.appendChild(cont);
    li.appendChild(contEdit);
    li.appendChild(date);

    //  delete y edit visible solo para user signin
    if (doc.data().uid === auth.currentUser.uid) {
      li.appendChild(del);
      li.appendChild(edit);
      li.appendChild(save);
      li.appendChild(cancel);

      save.setAttribute('class', 'oculto');
      cancel.setAttribute('class', 'oculto');
    }
    ul.appendChild(li);

    //  borrar publicacion
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      //  console.log('PRUEBA')
      const id = e.target.parentElement.getAttribute('data-id');
      const option = confirm('Estas segura/o de eliminar este post?');
      if (option === true) {
        deleteContent(id);
      }
    });

    //  editar publicacion
    edit.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      await getContent(id);
      //  console.log('editar');

      edit.setAttribute('class', 'oculto');
      cont.setAttribute('class', 'oculto');
      contEdit.setAttribute('class', 'visible');
      save.setAttribute('class', 'visible');
      cancel.setAttribute('class', 'visible');

      //  console.log('contEditvalue', contEdit.value);

      //  Diferente opcion para confirmar texto a editar
      /*
      let opcion = (prompt('Texto a editar', `${cont.data().content}`));
      if (opcion !== null || opcion !== "") {
        updateContent(id,{content: opcion})
      }
      */
    });
    //  eventos de editar guardar y cancelar
    save.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      //  console.log('guardar');
      if (contEdit.value !== null || contEdit.value !== '') {
        await updateContent(id, { content: contEdit.value });
        cancel.setAttribute('class', 'oculto');
        save.setAttribute('class', 'oculto');
        cont.setAttribute('class', 'visible');
        edit.setAttribute('class', 'visible');
      }
    });

    cancel.addEventListener('click', (e) => {
      e.stopPropagation();
      //  console.log('cancelar');
      edit.setAttribute('class', 'visible');
      cont.setAttribute('class', 'visible');
      contEdit.setAttribute('class', 'oculto');
      cancel.setAttribute('class', 'oculto');
      save.setAttribute('class', 'oculto');
    });
  });

  //  listar contenido revisar
  onGetContent((querySnapshot) => {
    //  console.log(querySnapshot)
    ul.innerHTML = '';
    querySnapshot.forEach((doc) => {
      //  console.log(doc.data())
      renderContent(doc);
    });
  });

  //  form crear contenido

  formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();
    //  console.log("enviar form"); // aux para test
    const content = document.getElementsByClassName('textArea')[0];
    //  console.log(content) //formCreate.textArea
    saveTextContent(content.value);

    formCreate.reset();
  });

  const goToTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  sectionTitle.addEventListener('click', goToTop);

  return div;
};
