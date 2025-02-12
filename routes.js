const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const usuarioController = require('./src/controllers/usuarioController')

//Rotas home
route.get('/', homeController.paginaInicial);

//Rotas entra(login)
route.get('/login/index', usuarioController.login );
route.post('/login/login', usuarioController.loginIn );
route.get('/login/cadastra', usuarioController.cadastra );
route.post('/login/cadastra', usuarioController.cadastraUsuario );
route.get('/login/logout', usuarioController.logout);


module.exports = route;
