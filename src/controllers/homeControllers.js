const HomeModel = require('../models/homeModel')

exports.paginaInicial = (req, res) =>  {
    res.render('index.ejs');
};

