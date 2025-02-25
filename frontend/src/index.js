import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Cadastro from './modules/Cadastro';
import Login from './modules/Login'

const cadastro = new Cadastro('.form-cadastra');
const login = new Login('.form-login');
cadastro.init();
login.init();