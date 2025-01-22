const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;
const path = require('path')

//express configurações
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//Arquivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));


//Views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`´Servido escutando na porta ${port}` );
    console.log(`Acesse http://localhost:${port}/`);

}).on('error', (err) => {
    console.error(`Erro ao iniciar o servidor: ${err.message}`);
});