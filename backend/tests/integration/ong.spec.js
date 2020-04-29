const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        //zera o banco antes de realizar os testes, o que impede lotar com restos anteriores
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Nome da ONG",
            email: "contato@ong.com",
            whatsapp: "65999998888",
            city: "Cuiabá",
            uf: "MT"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});