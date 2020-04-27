const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

// Exportando a conexao com o banco
module.exports = connection;