const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false},
    email: { type: String, required: false},
    numero: { type: String, required: false},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.success = [];
        this.contato = null;
    }


    async criarContato(){
        this.valida()
        
        if (this.errors.length > 0) return; 
        this.success.push('Contato salvo com sucesso');
        await ContatoModel.create(this.body);
     
    }

    valida(){
        this.cleanUp();

        //validar se nome 
        if(!this.body.nome){
            this.errors.push("Nome é um campo obrigatorio");
        }


        //Precisar ou de um email ou número de telefone
        if(!this.body.email && !this.body.numero){
            this.errors.push("Precisa de um email ou um número de telefone");
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
        //Verificar se tem campos que não são strings
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string')
                this.body[key] = '';
            }

            this.body = {
                nome: this.body.nome,
                sobrenome: this.body.email,
                email: this.body.email,
                numero: this.body.numero
            }
        
        }

     
}
module.exports = Contato