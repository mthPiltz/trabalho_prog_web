import { buscarLivro } from "../js/repositorioLivro.js";
import { buscarCriticasLivro } from "../js/repositorioCritica.js";

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
    document.getElementById('banner').src = livro.banner;
    document.getElementById('titulo').textContent = livro.titulo;
    document.getElementById('sinopse').textContent = livro.sinopse;
    document.getElementById('autor').textContent = "Autor: " + livro.autor;
    document.getElementById('genero').textContent = "Genero: " + livro.genero;
    document.getElementById('quantidadePaginas').textContent = "Quantidade de páginas: " + livro.quantidadePaginas;

    preencherDadosCritica(idLivro);
}

async function preencherDadosCritica(livro) {
    var criticas = await buscarCriticasLivro(livro);
    if (criticas.length == 0) {
        var container = document.getElementById('criticas-livro');
        container.innerHTML = "<span class='alerta'> Não há criticas para esse livro </span>"
    }
    else {
        criticas.forEach((critica) => {
            criarCriticaHTML(critica);
        });
    }
}

function criarCriticaHTML(critica) {
    var container = document.getElementById('criticas-livro');
    var criticaDiv = `
        <div class='critica'> 
            <p  class='critica-username' id='username'>${critica.username}</p>
            <p class='critica-data' id='data'>${critica.data}</p>
            <p class='critica-descricao texto' id='criticaDescricao'>${critica.critica}</p>
        </div>`
    container.innerHTML += criticaDiv;
}