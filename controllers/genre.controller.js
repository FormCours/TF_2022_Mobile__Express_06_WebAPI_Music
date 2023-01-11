const db = require('../models');
const genreService = require('../services/genre.service');
const { genreValidator } = require('../validators/genre.validator');

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
        // Récuperation des données du body validé !
        const data = req.validateData;

        // Verrification que le genre n'existe pas
        if (await genreService.checkIfExists(data.name)) {
            res.status(400).json({
                message: `Genre "${data.name}" already exists !`,
                status: 400,
            });
            return;
        }

        // Utilisation du service pour ajouter les données en DB
        const newGenre = await genreService.add(data);

        // Envoi d'un réponse
        res.location('/api/genre/' + newGenre.id);
        res.status(201).json(newGenre);
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