const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count();
        console.log(count)

        incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',//all the incidents 
                'ongs.name',//but about the ong, I select only the data I want
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);
        response.header('X-Total-Cont', count['count(*)'])
        return response.json(incidents)
    },
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({ id })
    },
    async delete(request, response) {
        const { id } = request.params;//id do incidete a apagar
        const ong_id = request.headers.authorization;//to know the logged ong

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' })//not authorized
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}