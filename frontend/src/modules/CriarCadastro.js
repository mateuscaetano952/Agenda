const validator = require('validator');

/**
 * A classe cadastra serve como validação do formulario criarCadastro
 */
export default class CriarCadastro {
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
        
        /**
         * Remove todos os elemetons com a classee error-msg que já foram adicionado.
         */
        this.removeElemento()

        if(!nomeInput.value){
            this.criarErrorMsg(nomeInput, 'Campo nome é obrigatorio');
            errors.push('Campo nome é obrigatorio')
            return
        }

        if(!emailInput.value){
            this.criarErrorMsg(emailInput, 'Email é um campo obrigatorio');
            errors.push('Campo nome é obrigatorio')
            return;
        }

        if(!validator.isEmail(emailInput.value)){
            this.criarErrorMsg(emailInput, 'Email invalido');
            return;
        }

        if(!senhaInput.value){
            this.criarErrorMsg(senhaInput, 'Senha é um campo obrigatorio');
            errors.push('Campo nome é obrigatorio')
            return;
        }


        if(senhaInput.value.length < 3){
            this.criarErrorMsg(senhaInput, 'A senha precisa ter entre 3 a 40 caracteres');
            errors.push('A senha precisa ter entre 3 a 40 caracteres');
            return;
        }

        if(!senhaConfirmacaoInput.value){
            this.criarErrorMsg(senhaConfirmacaoInput, 'Prencha o campo repita senha');
            errors.push('Campo nome é obrigatorio')
            return;
        }

        if(senhaConfirmacaoInput.value != senhaInput.value){
            this.criarErrorMsg(senhaInput, 'As senhas não batem');
            errors.push('Campo nome é obrigatorio')
            return;
        }
        
        
        
        
        if(!errors.length > 0) el.submit();
        return;
    }

    /**
     *  Procusa se já existe elementos com a classe error-msg e a remove, impedir que as mensagem 
     *  se stack.
     */
    removeElemento(){
        let el = document.getElementsByClassName('error-msg');
        console.log(el)
        if(el){
            for (let i = 0; i < el.length; i++) {
                el[i].remove();
            }
      }
      return;
    }

    /**
     * Criar um elemento span adicionar uma mensagem e inseri o elemento no elemento pai
     * msg <- Mensagem do html interno 
     * elementoPai <- ELemento o span sera inserido
     */
    criarErrorMsg(elementoPai, msg){
        const newNode = document.createElement('span');
        newNode.classList.add("error-msg");
        newNode.innerText = msg;
        elementoPai.parentNode.insertBefore(newNode, elementoPai.nextSibling);
        return;
    }
      
}