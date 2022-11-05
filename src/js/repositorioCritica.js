import { doc, collection, query, where, getDocs, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

import { inicializarFirebase } from './firebase.js'

const db = inicializarFirebase();


export async function buscarCriticasLivro(idLivro) {
    var livro = doc(db, 'livros', idLivro);
    const q = query(collection(db, "criticas"), where("codigoLivro", "==", livro));

    const querySnapshot = await getDocs(q);

    var criticasLivro = [];
    querySnapshot.forEach((doc) => {
        criticasLivro.push(converterCriticaParaJSON(doc.data()))
    });

    return criticasLivro;
}

export async function buscarCritica(id) {
    const docRef = doc(db, 'criticas', id);
    const docSnap = await getDoc(docRef).then(resultado => {
        return converterCriticaParaJSON(resultado.data());
    }).catch(erro => {
        console.log(erro);
    });
    return docSnap;
}

/* Exemplo chamada criarCritica() 
criarCritica(
    {
        "codigoLivro": doc(db, 'livros', "zAe2KrUkM7T3XlZJNW3F"),
        "critica": "Adorei",
        "data": "04/11/2022",
        "username": "Mauricio",
    }
)
*/

export async function criarCritica(critica) {
    const criticas = doc(collection(db, "criticas"));
    await setDoc(criticas, critica);
}

function converterCriticaParaJSON(documento) {
    return {
        "codigoLivro": documento.codigoLivro,
        "critica": documento.critica,
        "data": documento.data,
        "username": documento.username,
    }
}