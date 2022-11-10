import { buscarTodos } from "../js/repositorioLivro.js";

const listagem = document.getElementById("listagem");
const search = document.getElementById("search");

var livros = await buscarTodos();
listarLivros(livros);

async function listarLivros(lista) {
    listagem.innerHTML = "";
    for (let livro of lista) {
        let div = document.createElement("a");
        div.className = "list-item";
        div.href = "detalhesLivro.html?idLivro=" + livro.id;
        let img = document.createElement("img");
        img.className = "list-item-image";
        img.src = livro.banner;
        let label = document.createElement("label");
        label.innerHTML = livro.titulo;
        label.className = "list-item-label";
        div.appendChild(img);
        div.appendChild(label);
        listagem.appendChild(div);
    }
}

search.oninput = async () => {
    let filtro = livros.filter(livro => livro.titulo.toLowerCase().includes(search.value.toLowerCase()));
    listarLivros(filtro);
}

const btnCadastroLivro = document.getElementById("btn-cadastro-livro");
btnCadastroLivro.addEventListener('click', () => {
    window.location.href = "adicionarLivro.html";
})