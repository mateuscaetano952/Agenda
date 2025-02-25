import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Cadastro from './modules/Cadastro';

const cadastro = new Cadastro('.form-cadastra');
cadastro.init();