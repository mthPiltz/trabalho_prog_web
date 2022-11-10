import { buscarCritica, criarCritica, editarCritica } from "../js/repositorioCritica.js";
import { buscarLivro, buscarReferenciaLivro } from "../js/repositorioLivro.js";


let idLivro = obterIdLivro();
let idCritica = obterIdCritica();
preencherTela();


async function preencherTela() {
    if (idCritica != null) { //editar
        // mostrar informações da critica
        let criticaBanco = await buscarCritica(idCritica);
        document.getElementById('userName').value = criticaBanco.username;
        document.getElementById('critica').value = criticaBanco.critica;
    }

    var livro = await buscarLivro(idLivro);
    document.getElementById('livro-atual').textContent = livro.titulo;
}

function obterIdLivro() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/detalhesLivro.html?idLivro=zAe2KrUkM7T3XlZJNW3F
    const urlParams = new URLSearchParams(window.location.search);
    const idLivro = urlParams.get('idLivro')
    return idLivro;
}

function obterIdCritica() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/adicionarCritica.html?idLivro=zAe2KrUkM7T3XlZJNW3F&&idCritica=XbapO3v3BElWfIIsA4Fh
    const urlParams = new URLSearchParams(window.location.search);
    const idCritica = urlParams.get('idCritica')
    return idCritica;
}


const btnCadastroLivro = document.getElementById("btn-cadastro-livro");
const btnEnviar = document.getElementById("enviar");

btnCadastroLivro.addEventListener('click', () => {
    window.location.href = "adicionarLivro.html";
})

btnEnviar.addEventListener('click', async function () {
    let dadosCritica;
    let userName = document.getElementById('userName').value;
    let critica = document.getElementById('critica').value;

    if (validacao(userName, critica)) {
        let date = getDate();
        let codigoLivro = await buscarReferenciaLivro(idLivro);

        dadosCritica = {
            "username": userName,
            "critica": critica,
            "data": date,
            "codigoLivro": codigoLivro
        }

        if (idCritica != null) {
            await editarCritica(idCritica, dadosCritica);
        }
        else {
            await criarCritica(dadosCritica);
        }

        setTimeout(window.location.href = "detalhesLivro.html?idLivro=" + idLivro, 500);
    }
});

function validacao(userName, critica) {
    if (userName == "") {
        window.alert("Preencha o nome do Usuário");
        return false;
    }
    else if (critica == "") {
        window.alert("Preencha a descrição da critica");
        return false;
    }

    return true;
}

function getDate() {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;
}