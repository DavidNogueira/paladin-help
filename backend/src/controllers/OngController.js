const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        ongs = await connection('ongs').select('*')
        return response.json({ ongs })
    },
    async create(request, response) {
        //const params = request.query;//get query params http://localhost:3333/users?name=david&age=21
        //const params = request.params; //get rout params http://localhost:3333/users/12
        const data = request.body; //post body params http://localhost:3333/users
        console.log(data)
        const { name, email, whatsapp, city, uf } = data;
        const id = crypto.randomBytes(4).toString('HEX');//to generate an id with letters and nubers of four digits

        await connection('ongs').insert({//the first parameter is the name of the table, then the method insert
            //here, put all the columns the we want to insert
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return response.json({ id })
    }
}