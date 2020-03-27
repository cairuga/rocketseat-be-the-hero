const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    }); 

    afterAll(()=>{
        connection.destroy();
    });

    it('Should be able to create a new ong', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set(authorization : dksds)
        .send({
            nome: "ONG XYZ",
            email: "xyz@ongs.com",
            whatsapp: "51984006118",
            cidade: "Charqueadas",
            uf: "RS"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});