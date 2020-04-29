// importando módulo crypto para gerar id randômica de forma separada para poder realizar testes
const generateUniqueId = require('../utils/generateUniqueId');

//Importando a conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
            const ongs = await connection('ongs').select('*');
        
            return response.json(ongs);
        },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const  id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
}