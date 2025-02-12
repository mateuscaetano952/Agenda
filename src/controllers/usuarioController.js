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

    req.session.save();
    req.flash('success', login.success);
    return res.redirect('/login/index')
   

 
};

exports.loginIn = async (req, res) => {
   try{
    const login = new Login(req.body);
    await login.loginIn();

    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('/login/index');
        })
        return
    }

    
    req.session.user = login.user;
    req.flash('success', login.success);
    req.session.save();
    return res.redirect('/');
   }catch (e){
        console.log(e)
        res.render('./error.ejs');
   }


}



