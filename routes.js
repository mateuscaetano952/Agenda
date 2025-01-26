const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers')

//Middlewares
const {middlewareGlobal} = require('./src/middlewares/meuMiddlewares')

//Rotas home
route.get('/', middlewareGlobal,homeController.paginaInicial)

module.exports = route;
