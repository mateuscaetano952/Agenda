const Contato = require('../models/contatoModel');

exports.paginaInicial = async (req, res) =>  {
    try{
        const contatos = await Contato.listaContatos();

        if(!contatos) {
            contatos = [];
        }
        console.log(contatos)
        res.render('index.ejs', {contatos});
    
    }catch(error){
        console.log(error);
        res.render('error');
    }
};

exports.sobre = (req, res) => {
    res.render('sobre');
}