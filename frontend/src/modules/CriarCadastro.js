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
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]')
        const numeroInput = el.querySelector('input[name="numero"]')
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

        if(!emailInput.value && !numeroInput.value){
            this.criarErrorMsg(emailInput, 'Precisar ou de um email ou de um número');
            errors.push('Precisar ou de um email ou de um número')
            return
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