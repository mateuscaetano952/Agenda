const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const contatoController = require('./src/controllers/contatoController');
const usuarioController = require('./src/controllers/usuarioController');
const { loginRequired } = require('./src/middlewares/loginRequired');

//Rotas home
route.get('/', homeController.paginaInicial);
route.get('/sobre', homeController.sobre);

//Rotas login
route.get('/login/index', usuarioController.login );
route.post('/login/login', usuarioController.loginIn );
route.get('/login/cadastra', usuarioController.register );
route.post('/login/cadastra', usuarioController.cadastraUsuario );
route.get('/login/logout', usuarioController.logout);

//Rotas contato
route.get('/contato/index',loginRequired ,contatoController.index);
route.post('/contato/criarContato',loginRequired ,contatoController.criarContato);
route.get('/contato/index/:id',loginRequired ,contatoController.editIndex);
route.post('/contato/editaContato/:id',loginRequired, contatoController.editContato);
route.get('/contato/deletaContato/:id', loginRequired, contatoController.deleteContato);




module.exports = route;
