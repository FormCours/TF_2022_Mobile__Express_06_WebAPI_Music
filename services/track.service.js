const { TrackDTO } = require('../dto/track.dto');
const db = require('../models');

const trackService = {

    getAll: async (offset = 0, limit = 100) => {

        // Récuperation des données et le nombre de track
        const { count, rows } = await db.Track.findAndCountAll({
            offset,
            limit,
            include: [
                db.Genre,
                {
                    model: db.Artist,
                    through: { attributes: [] }
                }
            ],
            distinct: true // Corrige le "count" suite à la jointure Many-to-Many !
        });

        return {
            tracks: rows.map((t) => new TrackDTO(t)),
            count
        };
    },

    getById: async (id) => {

        const data = await db.Track.findByPk(id, {
            include: [
                db.Genre,
                {
                    model: db.Artist,
                    through: { attributes: [] }
                }
            ]
        });

        if (!data) {
            return null;
        }
        return new TrackDTO(data);
    },

    add: async (data) => {
        throw new Error('Faut bosser :o');
    },

    delete: async (id) => {
        throw new Error('Faut bosser :o');
    },

    update: async (id, data) => {
        throw new Error('Faut bosser :o');
    }

};

module.exports = trackService;