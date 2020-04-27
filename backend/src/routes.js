// importando o módulo express para a variavel express
const express = require('express'); 

// importando as Controladoras
const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const SessaoController = require('./controllers/SessaoController');

// variável que vai armazenar a aplicação
const routes = express.Router();

// rota para registro de sessão de usuário
routes.post('/sessao', SessaoController.create);

// configurando a rota para listar ONGs
routes.get('/ongs', OngController.index);

// configurando a rota para criar nova ONG
routes.post('/ongs', OngController.create);

//rota para listar casos especificos de uma ONG
routes.get('/perfil', PerfilController.index);

// rota para listar casos
routes.get('/casos', CasoController.index);

// rota para criar os casos (registros)
routes.post('/casos', CasoController.create);

// rota para deletar os casos
routes.delete('/casos/:id', CasoController.delete);


// exportando a variavel routes
module.exports = routes;