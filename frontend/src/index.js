import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Cadastro from './modules/Cadastro';
import Login from './modules/Login'
import CriarCadastro from './modules/CriarCadastro'

const cadastro = new Cadastro('.form-cadastra');
const login = new Login('.form-login');
const criarCadastro = new CriarCadastro('.criar-cadastro-form');
cadastro.init();
login.init();
criarCadastro.init();