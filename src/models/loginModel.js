const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    senha: { type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registra(){
        this.valida();
        if (this.errors.length > 0) return; 

        await this.userExisted();
        if (this.errors.length > 0) return; 
      
        await this.salvaUsuario()
    }

    valida(){
        this.cleanUp();

        //Valida email
        if(!validator.isEmail(this.body.email)) this.errors.push("Email inválido");
       
        //Validar senha
        if(this.body.senha.length < 3 ||  this.body.senha.length > 40) this.errors.push("Tamnho deve der entre 3 a 40 caracteres");
    }

     //Salva o usuario no banco de dados
     async salvaUsuario() {
        try {
            const user = new LoginModel(this.body);
            await user.save(); 
            this.user = user;
        } catch (error) {
            this.errors.push('Erro ao salvar usuário no banco de dados');
        }
   
    }

    async userExisted(){
        const usuarioExistente = await LoginModel.findOne({ email: this.body.email });
        if (usuarioExistente) {
            this.errors.push("Email já existe");
            return;
        }
    }

    //Verifica se tem elementos que não são Strings
    cleanUp(){
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string')
                this.body[key] = '';
            }

            //Só os campos email e senha
            this.body = {
                email: this.body.email,
                senha: this.body.senha
            }
        
        }

}
module.exports = Login