const { Op } = require('sequelize');
const db = require('../models');
const GenreDTO = require('../dto/genre.dto');

const genreService = {

    getAll: async () => {
        const genres = await db.Genre.findAll();
        return genres.map(genre => new GenreDTO(genre));
    },

    getById: async (id) => {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return null;
        }
        return new GenreDTO(genre);
    },

    add: async (data) => {
        if (!data) throw new Error('Data is required !');
        const genre = await db.Genre.create(data);
        return new GenreDTO(genre);
    },
    searchByName: async (query) => {
        const cleanQuery = query.replaceAll(/[%_]/g, "");
        const genres = await db.Genre.findAll({
            where: {
                name: {
                    [Op.substring]: cleanQuery
                }
            }
        });

        return genres.map(genre => new GenreDTO(genre));
    }
};

module.exports = genreService;