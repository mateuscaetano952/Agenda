const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false},
    email: { type: String, required: false},
    numero: { type: String, required: false},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

/**
 * Representa um contato 
 * nome 
 * sobrenome
 * Email
 * Telefone
 */
class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.success = [];
        this.contato = null;
    }

    //Funções estaticas
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
        if(!contato) return;
        return;
    }


    async criarContato(){
        this.valida()
        
        if (this.errors.length > 0) return; 
        this.success.push('Contato salvo com sucesso');
        this.contato = await ContatoModel.create(this.body);
        return;
     
    }

    async edit(id){
        this.valida();
        if (this.errors.length > 0) return; 
        if(!id && id != String) {
            this.errors.push("Ocorreu um erro no processamento"); 
            return;
        }

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
        this.success.push('Contato editado com sucesso');
        

    }


    valida(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)){
            this.errors.push("Email invalido")
        }

        if(!this.body.nome){
            this.errors.push("Nome é um campo obrigatorio");
        }

        //Precisar ou de um email ou número de telefone
        if(!this.body.email && !this.body.numero){
            this.errors.push("Precisa de um email ou um número de telefone");
        }

        

    }

    //Higienização dos campo
    cleanUp(){
       
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