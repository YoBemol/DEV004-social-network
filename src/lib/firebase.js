// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNUPEEUeTO_IcLEswpHye3cOmgsmWKxMc",
  authDomain: "social-network-bey.firebaseapp.com",
  projectId: "social-network-bey",
  storageBucket: "social-network-bey.appspot.com",
  messagingSenderId: "834389993260",
  appId: "1:834389993260:web:471242960dd0a394c56e89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//para login.js
export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider(); // instancia es una clase q va a devolver un objeto
  const credentials = await signInWithPopup(auth, provider);
  return credentials;
}

//para login.js
export const loginEmail = async (email, password) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials;
}

//para register.js
export const createUser = async (email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
  return userCredentials;
}

export const logOutUser = async () => {
  return await signOut(auth);
}

export {
  
  onAuthStateChanged,
}