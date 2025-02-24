const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const saltRounds = 6;


const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    email: { type: String, required: true},
    senha: { type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.success = [];
        this.user = null;
    }


    async loginIn(){
        this.cleanUp();
        let user = await LoginModel.findOne({ email: this.body.email });
        if(!user){
            this.errors.push("Email não encontrado se você não tive uma crie uma conta");
            user = null;
            return;
        }

        if(!bcrypt.compareSync(this.body.senha, user.senha)){
            this.errors.push("Senha incorreta tente outra vez");
            user = null;
            return;
        }
        
        this.success.push("Logado com sucesso");
        this.user = user;
    }

    //register usuario novo
    async register(){
        this.valida();
        if (this.errors.length > 0) return; 

        this.hashPassword();

        if (await this.userExisted()) {
            this.errors.push("Email já existe");
            return;
        }

        this.success.push("Usuario criado com sucesso");
        await this.salvaUsuario();
        return;
    }


    valida(){
        console.log(this.body.nome)
        this.cleanUp();

        if(!this.body.nome) {
            this.errors.push("Nome é um campo obrigatorio");
            return;
        }

        //Valida email
        if(!validator.isEmail(this.body.email)) {
            this.errors.push("Email inválido");
            return;
        }
       
        //Validar senha
        if(this.body.senha.length < 3 ||  this.body.senha.length > 40) {
            this.errors.push("Tamnho deve der entre 3 a 40 caracteres");
            return;
        }


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
                nome: this.body.nome,
                email: this.body.email,
                senha: this.body.senha
            }
        
        }

     
}
module.exports = Login