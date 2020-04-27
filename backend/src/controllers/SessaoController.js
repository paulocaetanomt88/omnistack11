const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //busca o id da ONG através do corpo da requisição
        const { id } = request.body;

        //busca a ong pelo id recebido e seleciona o nome
        const ong = await connection('ongs')
          .where('id', id)
          .select('name')
          .first();

        // Se a ong não existir retorna erro de Bad Request
        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }

        // retorna os dados da ong em formato json (nesse caso só o nome foi selecionado)
        return response.json(ong);
    }
}