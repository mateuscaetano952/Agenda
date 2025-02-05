const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const usuarioController = require('./src/controllers/usuarioController')

//Rotas home
route.get('/', homeController.paginaInicial);

//Rotas entra(login/cadastra)
route.get('/usuario/login', usuarioController.login );
route.get('/usuario/cadastra', usuarioController.cadastra );

module.exports = route;
