const connection = require('../database/connection');
//const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');


module.exports = {
    async create(request, response) {
        const { nome, email, whatsapp, cidade, uf } = request.body;
        //const id = crypto.randomBytes(4).toString('HEX');
        const id = generateUniqueId();
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf
        })
        return response.json( {"id" : id } );
    },

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);    
    }

};