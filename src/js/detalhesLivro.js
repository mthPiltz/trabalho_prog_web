import { buscarLivro, buscarCriticasLivro } from "../../firebase.js";

var idLivro = obterIdLivro();
preencherDadosLivro(idLivro);
document.getElementById("adicionarCritica").addEventListener('click', () => {
    window.location.href = "adicionarCritica.html?idLivro=" + idLivro;
});

function obterIdLivro() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/detalhesLivro.html?idLivro=zAe2KrUkM7T3XlZJNW3F
    const urlParams = new URLSearchParams(window.location.search);
    const idLivro = urlParams.get('idLivro')

    return idLivro;
}

async function preencherDadosLivro(idLivro) {
    const livro = await buscarLivro(idLivro);

    document.getElementById('titulo').textContent = livro.titulo;
    document.getElementById('sinopse').textContent = livro.sinopse;
    document.getElementById('autor').textContent = livro.autor;
    document.getElementById('genero').textContent = livro.genero;
    document.getElementById('quantidadePaginas').textContent = livro.quantidadePaginas;

    preencherDadosCritica(idLivro);
}

async function preencherDadosCritica(livro) {
    var criticas = await buscarCriticasLivro(livro);

    criticas.forEach((doc) => {
        var critica = doc.data()
        criarCriticaHTML(critica);
    });
}

function criarCriticaHTML(critica) {
    var container = document.getElementById('criticas-livro');
    var criticaDiv = `
        <div class='critica'> 
            <p  class='critica-username' id='username'>${critica.userName}</p>
            <p class='critica-data' id='data'>${critica.data}</p>
            <p class='critica-descricao texto' id='criticaDescricao'>${critica.critica}</p>
        </div>`
    container.innerHTML += criticaDiv;
}