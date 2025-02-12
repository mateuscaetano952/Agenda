const Login = require('../models/loginModel')

//Salva sessão e retorna feedback para o usuario
const lidaComResposta = (req, res, rota, listaDeMsg, temError ) => {
    if(temError){
        req.flash('errors', listaDeMsg);
    }else{
        req.flash('success', listaDeMsg);
    }

    req.session.save(() => res.redirect(rota));
}

exports.login = (req, res) =>  {
    res.render('login.ejs');
};

exports.register = (req, res) =>  {
    res.render('cadastra.ejs');
};

exports.cadastraUsuario = async (req, res) =>  {
    try{
        const login = new Login(req.body);
        await login.register()
    
        if(login.errors.length > 0){
           return lidaComResposta(req, res, '/login/cadastra', login.errors, true);
        }
        
        //Se register foi bem succedido
        return lidaComResposta(req, res, '/login/index', login.success, false);
       
    
     
    }catch(e){
        console.log(e)
        return res.render('error')
    }
};

exports.loginIn = async (req, res) => {
   try{
    const login = new Login(req.body);
    await login.loginIn();

    if(login.errors.length > 0){
        return lidaComResposta(req, res, '/login/index', login.errors, true);
    }

    //Se login foi bem succedido
    req.session.user = login.user;
    return lidaComResposta(req, res, '/', login.success, false);
   }catch (e){
        console.log(e)
        res.render('./error.ejs');
   }


}

exports.logout = (req, res) => {
   try{
    req.session.destroy();
    return res.redirect('/');
   }catch(e){
        console.log(e)
        res.render('./error.ejs');
   }
}



