const db = require('../models');
const genreService = require('../services/genre.service');

const genreController = {
    getAll: async (req, res) => {
        const data = await genreService.getAll();

        res.status(200).json(data);
    },

    getById: async (req, res) => {
        const id = req.params.id;

        const data = await genreService.getById(id);

        if (!data) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(data);

    },

    add: async (req, res) => {

        const data = req.body;

        const newGenre = await genreService.add(data);

        res.location('/api/genre/' + newGenre.id);
        res.sendStatus(201).json(newGenre);

    },

    searchByName: async (req, res) => {

        const query = req.params.name;
        console.log(query);
        const genresByName = await genreService.searchByName(query);
        console.log(genresByName);

        res.status(200).json(genresByName);
    }
};

module.exports = genreController;