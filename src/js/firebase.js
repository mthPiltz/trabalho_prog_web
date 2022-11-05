// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDty-enUdJ8DGFxhghy1EedoHm5FvZ7WfA",
  authDomain: "minhacritica-9137c.firebaseapp.com",
  projectId: "minhacritica-9137c",
  storageBucket: "minhacritica-9137c.appspot.com",
  messagingSenderId: "651227375964",
  appId: "1:651227375964:web:615787542fe0db7a71b999"
};

export function inicializarFirebase() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}