require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT;
const path = require('path');

//Conecteando com a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Conectado com base de dados");
        app.emit("pronto");
    })
    .catch((e) => {console.log("Erro na conexão:" + e)})

//Modulos refente as sessões.
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//Configurações de sessões
const sessionOptions = session({
    secret: 'asdasdasdasd asdsa asdsad asdasd asd',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000* 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash);

//express configurações e rotas
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//Arquivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));


//View engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Iniciando servido
app.on('pronto', () => {
    app.listen(port, () => {
        console.log(`´Servido escutando na porta ${port}` );
        console.log(`Acesse http://localhost:${port}/`);
    
    }).on('error', (err) => {
        console.error(`Erro ao iniciar o servidor: ${err.message}`);
    });
});