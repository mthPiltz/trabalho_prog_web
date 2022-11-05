import { criarCritica } from "../js/repositorioCritica.js"
import { buscarCriticasLivro } from "../js/repositorioCritica.js"

const btnCadastroLivro = document.getElementById("btn-cadastro-livro");
const btnEnviar = document.getElementById("enviar");

btnCadastroLivro.addEventListener('click', ()=>{
    window.location.href = "adicionarLivro.html";
})

btnEnviar.addEventListener('click', ()=>{
    let userName = document.getElementById('userName').value;
    let critica = document.getElementById('critica').value;
    let dadosCritica;

    if(validacao(userName, critica)){        
        let date = getDate();
        let idLivro = "1";

        dadosCritica = {
            userName,
            critica,
            date,
            idLivro
        }
    }
    criarCritica(dadosCritica);
    console.log(buscarCriticasLivro("1"));   

});

function validacao(userName, critica){
    if (userName == ""){
        window.alert("Preencha o nome do Usuário");
        return false;
    }
    else if (critica == ""){
        window.alert("Preencha a descrição da critica");
        return false;
    }

    return true;
}

function getDate(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;
}