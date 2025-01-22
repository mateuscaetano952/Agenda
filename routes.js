const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers')

//Rotas home
route.get('/', homeController.paginaInicial)

module.exports = route;
