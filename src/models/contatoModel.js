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
        this.contato = await ContatoModel.create(this.body);
     
    }

    valida(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)){
            this.errors.push("Email invalido")
        }

        //validar se nome 
        if(!this.body.nome){
            this.errors.push("Nome é um campo obrigatorio");
        }


        //Precisar ou de um email ou número de telefone
        if(!this.body.email && !this.body.numero){
            this.errors.push("Precisa de um email ou um número de telefone");
        }

        

    }

    async edit(id){
        this.valida();
        if (this.errors.length > 0) return; 
        
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
        this.success.push('Contato editado com sucesso');
        

    }

     static async achaContato(id) {
        try {
            const contato = await ContatoModel.findOne({ _id: id });
            return contato;
        } catch (error) {
           console.log(error);
            return false;
        }
    }

    static async listaContatos(){
        const contatos = ContatoModel.find()
    .sort({ criadoEm: -1 })

        return contatos;
    }

    static async deleteContato(id){
        const contato  = await ContatoModel.findOneAndDelete( {_id: id});
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