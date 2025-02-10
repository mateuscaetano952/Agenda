const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const saltRounds = 6;


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


    async loginIn(){
        this.cleanUp();
        let user = await LoginModel.findOne({ email: this.body.email });
        console.log(user)
        if(!user){
            this.errors.push("Email não encontrado se você não tive uma crie uma conta");
            user = null;
            return;
        }

        console.log(bcrypt.compareSync(user.senha, this.body.senha))
        if(!bcrypt.compareSync(user.senha, this.body.senha)){
            this.errors.push("Senha incorreta tente outra vez");
            user = null;
            return;
        }
    }

    //Registra usuario novo
    async registra(){
        this.valida();
        if (this.errors.length > 0) return; 

        this.hashPassword();

        if (await this.userExisted()) {
            this.errors.push("Email já existe");
            return;
        }

        await this.salvaUsuario()
    }


    valida(){
        this.cleanUp();

        //Valida email
        if(!validator.isEmail(this.body.email)) this.errors.push("Email inválido");
       
        //Validar senha
        if(this.body.senha.length < 3 ||  this.body.senha.length > 40) this.errors.push("Tamnho deve der entre 3 a 40 caracteres");


    }

    hashPassword(){
        try{
            const salt = bcrypt.genSaltSync(saltRounds);
            this.body.senha = bcrypt.hashSync(this.body.senha, salt);
        } catch(e){
            console.log(e)
        }
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

     async userExisted() {
        try {
            const usuarioExistente = await LoginModel.findOne({ email: this.body.email });
            return !!usuarioExistente;
        } catch (error) {
            this.errors.push("Erro ao se conectar com o banco de dados");
            return false;
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