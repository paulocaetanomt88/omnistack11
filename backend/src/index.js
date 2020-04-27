// importando o módulo express para a variavel express
const express = require('express');

// importando o módulo de segurança CORS
const cors = require('cors');

// importando as rotas
const routes = require('./routes');

// variável que vai armazenar a aplicação
const app = express();

// Se for hospedar a aplicação, deve definir o endereço usando o parâmetro origin
// conforme o código abaixo
// app.use(cors({
//    origin: 'http://meuapp.com'
// }));

app.use(cors());
app.use(express.json());

// importando a variavel routes do arquivo routes.js
app.use(routes);

// app ouvindo na porta localhost:3333
app.listen(3333);