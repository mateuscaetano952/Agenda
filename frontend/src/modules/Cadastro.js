const validator = require('validator');

/**
 * A classe cadastra serve como validação do formulario cadastra.ejs
 */
export default class Cadastra {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        this.event();
    }

    event(){
        /**
         * Captura o evento de envior de formulario -> chama a função valida passando o evento como parametro.
         */
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.valida(e);
        })
    }

    valida(e){
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]')
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="senha"]')
        const senhaConfirmacaoInput = el.querySelector('input[name="senha-confirmacao"]')
        let errors = [];

        console.log(nomeInput.value)

        if(!nomeInput.value){
            const newNode = document.createElement('span');
            newNode.classList.add("alert-danger");
            newNode.innerText = 'Campo nome é obrigatorio';
            nomeInput.parentNode.insertBefore(newNode, nomeInput.nextSibling);
            alert('Campo nome é obrigatorio')
            errors.push('Campo nome é obrigatorio')
            return
        }

        if(!emailInput.value){
            alert('Email é um campo obrigatorio');
            errors.push('Email é um campo obrigatorio');
            return;
        }

        if(!validator.isEmail(emailInput.value)){
            alert('Email invalido');
            errors.push('Email invalido');
            return;
        }

        if(!senhaInput.value){
            alert('Senha é um campo obrigatorio');
            errors.push('Senha é um campo obrigatorio');
            return;
        }

        if(!senhaConfirmacaoInput.value){
            alert('Prencha o campo repita senha');
            errors.push('Prencha o campo repita senha');
            return;
        }

        if(senhaConfirmacaoInput.value != senhaInput.value){
            alert('As senhas não batem');
            errors.push('As senhas não batem');
            return;
        }
        
        
        
        
        if(!errors.length > 0) el.submit();
        return;
    }
      
}