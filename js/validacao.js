// Campos
const inputNome = document.getElementById('fnome');
const inputEmail = document.getElementById('femail');
const inputAssunto = document.getElementById('fassunto');
const inputMensagem = document.getElementById('fmensagem');
const enviarFormulario = document.getElementById('enviar');

// Erros de validação
const ulErros = document.getElementById('erros');
let erros = [];

// Regras de validação
const inputs = [inputNome, inputEmail, inputAssunto, inputMensagem];
const nomeCampos = ['nome', 'email', 'assunto', 'mensagem'];
const maxCaracteres = [50, 50, 50, 300];

// Funções úteis
function vazio(input) {
    return input.value === '';
}

function numCaracteres(input) {
    return input.value.length;
}

// Validações

function validaObrigatorios() {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let nomeCampo = nomeCampos[i];
        if (vazio(input))
            erros.push(`O campo ${nomeCampo} é obrigatório.`);
    }
}

function validaComprimento() {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let nomeCampo = nomeCampos[i];
        let max = maxCaracteres[i];
        if (numCaracteres(input) > max && nomeCampo !== 'email') // O comprimento do e-mail não deve ser validado
            erros.push(`O campo ${nomeCampo} não pode ter mais de ${max} caracteres.`);
    }
}

function validaEmail(){
    let email = inputEmail.value;
    if (!email.includes('@') || !email.includes('.'))
        erros.push('Formato inválido de email.');
}

// Listagem dos erros
function criaLi(mensagem) {
    let li = document.createElement('li');
    li.textContent = mensagem;

    return li;
}

function listaErros() {
    erros.forEach(function(mensagemErro) {
        let erro = criaLi(mensagemErro);
        ulErros.appendChild(erro);
    });
}

// Eventos
inputs.forEach(function(input) {
    input.addEventListener('input', function() {
        erros = [];
        ulErros.innerHTML = '';
        validaObrigatorios();
        validaComprimento();
        validaEmail();

        if (erros.length > 0){
            listaErros();
            enviarFormulario.classList.add('desativado');
            return;
        }
        enviarFormulario.classList.remove('desativado');
    });
});

enviarFormulario.addEventListener('click', function(event) {
    if (enviarFormulario.classList.contains('desativado')){
        event.preventDefault();
        return;
    }
    
    inputs.forEach(function(input) {
        input.value = '';
        enviarFormulario.classList.add('desativado');
    })

});