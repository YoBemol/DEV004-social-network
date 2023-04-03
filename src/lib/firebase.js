// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, // as signOutF,
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

export {
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,//: () => signOutF(),
  onAuthStateChanged,
}