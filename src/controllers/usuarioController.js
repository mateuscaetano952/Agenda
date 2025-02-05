const Login = require('../models/loginModel')

exports.login = (req, res) =>  {
    res.render('login.ejs');
};

exports.cadastra = (req, res) =>  {
    res.render('cadastra.ejs');
};

exports.cadastraUsuario = (req, res) =>  {
    const login = new Login(req.body);
    login.registra()
    res.send(login.errors);
};




