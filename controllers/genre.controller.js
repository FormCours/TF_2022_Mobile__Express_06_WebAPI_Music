const { ErrorResponse } = require('../api-responses/error-response');
const { SuccessResponse, SuccessCollectionResponse } = require('../api-responses/success-response');
const genreService = require('../services/genre.service');

const genreController = {
    getAll: async (req, res) => {
        // Récuperation les infos de pagination (ajouter via le middleware)
        const { offset, limit } = req.pagination;

        // Récuperation des données dans la DB
        const { genres, count } = await genreService.getAll(offset, limit);

        // Envoi de la réponse
        res.status(200).json(new SuccessCollectionResponse(genres, count));
    },

    getById: async (req, res) => {
        const id = req.params.id;

        const data = await genreService.getById(id);

        if (!data) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(new SuccessResponse(data));

    },

    add: async (req, res) => {
        // Récuperation des données du body validé !
        const data = req.validateData;

        // Verrification que le genre n'existe pas
        if (await genreService.checkIfExists(data.name)) {
            res.status(400).json(new ErrorResponse(
                `Genre "${data.name}" already exists !`
            ));
            return;
        }

        // Utilisation du service pour ajouter les données en DB
        const newGenre = await genreService.add(data);

        // Envoi d'un réponse
        res.location('/api/genre/' + newGenre.id);
        res.status(201).json(new SuccessResponse(newGenre, 201));
    },

    searchByName: async (req, res) => {

        const query = req.params.name;
        const { offset, limit } = req.pagination;

        const { genres, count } = await genreService.searchByName(query, offset, limit);

        res.status(200).json(new SuccessCollectionResponse(genres, count));
    }
};

module.exports = genreController;