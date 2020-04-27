//Importando a conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // busca o parâmetro page na URL, se não existir assume o valor 1
        const { page = 1 } = request.query;

        // busca e conta o total de casos cadastrados e armazena em count
        const [count] = await connection('casos').count();

        const casos = await connection('casos')
          .join('ongs', 'ongs.id', '=', 'casos.ong_id')
          .limit(5)
          .offset((page -1) * 5)
          .select([
              'casos.*',
              'ongs.name',
              'ongs.email',
              'ongs.whatsapp',
              'ongs.city',
              'ongs.uf',
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // pega o número do registro e guarda na variavel id
        const [id] = await connection('casos').insert({
            title,
            description,
            value,
            ong_id,
        })
        
        // retorna o id do caso criado
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('casos')
            .where('id', id)
            .select('ong_id')
            .first();

        if (caso.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('casos').where('id', id).delete();

        return response.status(204).send();
    }
};