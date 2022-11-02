import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcvy0G6hhMUdVWh1A3NU7ol4p1SGY1l7k",
  authDomain: "minhacritica-efb07.firebaseapp.com",
  projectId: "minhacritica-efb07",
  storageBucket: "minhacritica-efb07.appspot.com",
  messagingSenderId: "535225357203",
  appId: "1:535225357203:web:a19abefd166c7af6c08e66",
  measurementId: "G-3YGJWWTETZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);