// importando o módulo express para a variavel express
const express = require('express');

// importando o celebrate para validação
// Segments é uma constante
// Joi é uma biblioteca
const { celebrate, Segments, Joi } = require('celebrate');

// importando as Controladoras
const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const SessaoController = require('./controllers/SessaoController');

// variável que vai armazenar a aplicação
const routes = express.Router();

// rota para registro de sessão de usuário
routes.post('/sessao', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessaoController.create);

// configurando a rota para listar ONGs
routes.get('/ongs', OngController.index);

// configurando a rota para criar nova ONG
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

//rota para listar casos especificos de uma ONG
routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), PerfilController.index);

// rota para listar casos
routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), CasoController.index);

// rota para criar os casos (registros)
routes.post('/casos', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), CasoController.create);

// rota para deletar os casos
routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), CasoController.delete);


// exportando a variavel routes
module.exports = routes;