const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const contatoController = require('./src/controllers/contatoController');
const usuarioController = require('./src/controllers/usuarioController');
const { loginRequired } = require('./src/middlewares/loginRequired');

//Rotas home
route.get('/', homeController.paginaInicial);

//Rotas login
route.get('/login/index', usuarioController.login );
route.post('/login/login', usuarioController.loginIn );
route.get('/login/cadastra', usuarioController.register );
route.post('/login/cadastra', usuarioController.cadastraUsuario );
route.get('/login/logout', usuarioController.logout);

//Rotas contato
route.get('/contato/index',loginRequired ,contatoController.index);
route.post('/contato/criarContato',loginRequired ,contatoController.criarContato);




module.exports = route;
