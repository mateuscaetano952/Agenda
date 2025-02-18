exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisar estar logado para acessa essa página');
        return res.redirect('/');
        
    }
    next();
};