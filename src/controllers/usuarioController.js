const Login = require('../models/loginModel')

exports.login = (req, res) =>  {
    res.render('login.ejs');
};

exports.cadastra = (req, res) =>  {
    res.render('cadastra.ejs');
};

exports.cadastraUsuario = async (req, res) =>  {
    const login = new Login(req.body);
    await login.registra()
    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('/login/cadastra');
        })
        return
    }

    return res.redirect('/login/index')
};




