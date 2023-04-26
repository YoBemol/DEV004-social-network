# Red Social INFONATURA

![](https://github.githubassets.com/src/img/hoja.png){width='600' height='420'}

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Criterios de aceptación mínimos del proyecto](#2-criterios-de-aceptación-mínimos-del-proyecto)
* [3. Entrega](#3-entrega)

## 1. Resumen del proyecto

Nombre producto: INFO NATURA

Descripción: Red social para amantes de la naturaleza.

Este proyecto es una
[Single-page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application)
[_responsive_](https://curriculum.laboratoria.la/es/topics/css/02-responsive) (con más de una vista / página)
que permite a cualquier usuario crear una cuenta de acceso
y loguearse con ella; crear, editar y borrar publicacciones.

### Los objetivos generales de este proyecto son los siguientes

* Desarrollar una SPA con temática de red social ✓
* Aplicar los conceptos de responsividad en el desarrollo de las vistas (templates) ✓
* Implementar un router para la navegación entre las diferentes vistas de la aplicación ✓
* Emplear un servicio externo para la persistencia de datos de la aplicación ✓
* Crear una suite de pruebas unitarias que permitan testear código asíncrono ✓


## 2. Criterios de aceptación mínimos del proyecto

### 2.1 Boilerplate

Se organizó los archivos siguiendo una estructura
de [Modelo-Vista-Controlador](https://developer.mozilla.org/es/docs/Glossary/MVC).

Se utilizó la herramienta
[Vite](https://es.vitejs.dev/) para empaquetar módulos y arrancar
el servidor de desarrollo, `Hot Module Replacement`
[(HMR)](https://es.vitejs.dev/guide/features.html#hot-module-replacement),


### 2.2 Definición del producto

* Quiénes son los principales usuarios de producto.

Se dirige a personas que quieran compartir experiencias, noticias y consejos sobre el cuidado y proteccion del medio ambiente.

* Qué problema resuelve el producto / para qué le servirá a estos usuarios.

Unir a personas que comparten su preocupación por el cuidado del planeta.

### 2.3 Historias de usuario

![](https://github.githubassets.com/src/img/HU_Proyecto3.jpeg)

### 2.4 Diseño de la Interfaz de Usuario (prototipo de baja y alta fidelidad)

![](https://github.githubassets.com/src/img/IMG-Intro_log_reg.jpg)

![](https://github.githubassets.com/src/img/mobile_HU1.jpg)

### 2.5 Responsive

Debe verse bien en dispositivos de pantallas grandes
(computadoras/es, laptops, etc.) y pequeñas (_tablets_, celulares, etc.). Técnica [_`mobile first`_](#mobile-first) 

### 2.6 Comportamiento de la interfaz de usuario (UI)

#### Creación de cuenta de usuario e inicio de sesión

* _Login_ con Firebase:
  - Para el _login_ y las publicaciones en el muro se utilizó [Firebase](https://firebase.google.com/products/database/)
  - Creación de cuenta de acceso y autenticación con cuenta de correo y
    contraseña, y también con una cuenta de Google.
* Validaciones:
  - Solamente se permite el acceso a usuarios con cuentas válidas.
  - No pueden haber usuarios repetidos.
  - La cuenta de usuario debe ser un correo electrónico válido.
  - Lo que se escriba en el campo (_input_) de contraseña debe ser secreto.
* Comportamiento:
  - Al enviarse el formulario de registro o inicio de sesión, debe validarse.
  - Si hay errores, se deben mostrar mensajes descriptivos para ayudar al
  usuario a corregirlos.

#### Muro/timeline

* Validaciones:
  - Al publicar, se debe validar que exista contenido en el _input_.
* Comportamiento:
  - Al recargar la aplicación, se debe verificar si el usuario está _logueado_
    antes de mostrar contenido.
  - Poder publicar un _post_.    
  - Poder eliminar un post específico.
  - Pedir confirmación antes de eliminar un _post_.
  - Al dar _click_ para editar un _post_, debe cambiar el texto por un _input_
    que permita editar el texto y luego guardar los cambios.
  - Al guardar los cambios debe cambiar de vuelta a un texto normal pero con la
    información editada.
  - Al recargar la página debo de poder ver los textos editados.

### 2.7 Consideraciones técnicas Front-end

* Separar la manipulación del DOM de la lógica (Separación de responsabilidades).
* Contar con múltiples vistas.
 [Single Page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application)
* Alterar y persistir datos. Se utilizó
  [Firebase](https://firebase.google.com/).

### 2.8 Consideraciones técnicas UX

* Hacer al menos 2 entrevistas con usuarios.
* Hacer un  prototipo de baja y alta fidelidad.
* Hacer sesiones de _testing de usabilidad_ con el producto en HTML.

## 3. Entrega

Código en GitHub [Social Network - INFONATURA](https://github.com/YoBemol/DEV004-social-network) y la
interfaz será desplegada usando GitHub pages u otro servicio de hosting
(Firebase, Netlify, Vercel, etc).

***

