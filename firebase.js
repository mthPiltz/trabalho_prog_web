// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDty-enUdJ8DGFxhghy1EedoHm5FvZ7WfA",
  authDomain: "minhacritica-9137c.firebaseapp.com",
  projectId: "minhacritica-9137c",
  storageBucket: "minhacritica-9137c.appspot.com",
  messagingSenderId: "651227375964",
  appId: "1:651227375964:web:615787542fe0db7a71b999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function buscarLivro(id) {
  const docRef = doc(db, 'livros', "zAe2KrUkM7T3XlZJNW3F");
  const docSnap = await getDoc(docRef).then(resultado => {
    return converterLivroJSON(resultado.data());
  }).catch(erro => {
    console.log(erro);
  });
  return docSnap;
}

function converterLivroJSON(documento) {
  return {
    "titulo": documento.titulo,
    "genero": documento.genero,
    "quantidadePaginas": documento.quantidadePaginas,
    "autor": documento.autor,
    "sinopse": documento.sinopse,
    "banner": documento.banner,
  }
}

export async function buscarCriticasLivro(idLivro) {
  const criticasRef = collection(db, "criticas");
  var livro = doc(db, 'livros', idLivro);

  // Create a query against the collection.
  const q = query(criticasRef, where("codigoLivro", "==", livro));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
}


export async function buscarTodos() {
  const querySnapshot = await getDocs(collection(db, "livros"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

// function criarLivro() {
//   db.collection("livros").add({
//     titulo: "",
//     genero: "",
//     quantidadePaginas: "",
//     autor: "",
//     sinopse: "",
//     banner: "",
//   })
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
// }

// function listarLivros() {
//   db.collection("livros").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });
// }