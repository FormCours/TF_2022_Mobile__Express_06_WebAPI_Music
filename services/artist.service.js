const { Op } = require('sequelize');
const ArtistDTO = require('../dto/artist.dto');
const db = require('../models');

const artistService = {

    getAll: async () => {

        // Recuperation des données via Sequelize
        const artists = await db.Artist.findAll();

        // Envoi des données dans un objet DTO
        return artists.map(a => new ArtistDTO(a));
    },

    getById: async (id) => {
        // Exemple de clause "where" detailé
        /*
        const artist = await db.Artist.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
        */

        // Exemple de clause "where" sur le PK
        const artist = await db.Artist.findByPk(id);

        if (!artist) {
            return null;
        }

        // Envoi des données dans un objet DTO
        return new ArtistDTO(artist);
    },

    add: async (data) => {
        if (!data) {
            throw new Error('Data is required !');
        }

        // 
        const newArtist = await db.Artist.create(data);

        // Envoi des données dans un objet DTO
        return new ArtistDTO(newArtist);
    },

    update: async (id, data) => {
        if (!data) {
            throw new Error('Data is required !');
        }

        const dataUpdated = await db.Artist.update(data, {
            where: { id },
            validate: true,
            returning: true
        });

        if (dataUpdated[0] !== 1) {
            return null;
        }

        // Envoi des données dans un objet DTO
        const artist = dataUpdated.flat()[1].dataValues;
        return new ArtistDTO(artist);
    },

    delete: async (id) => {

        const nbRowDeleted = await db.Artist.destroy({
            where: { id }
        });

        return nbRowDeleted === 1;
    }
};

module.exports = artistService;