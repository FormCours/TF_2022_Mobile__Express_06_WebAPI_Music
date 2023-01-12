const { InvalidBodyErrorResponse } = require('../api-responses/error-response');
const { SuccessCollectionResponse, SuccessResponse } = require('../api-responses/success-response');
const artistService = require('../services/artist.service');

const artistController = {
    getAll: async (req, res) => {
        // Récuperation des infos de pagination ajouter via le middleware "pagination"
        const { offset, limit } = req.pagination;

        // Récuperation des données via le service
        const { artists, count } = await artistService.getAll(offset, limit);

        // Envoi des données via le modele de reponse de l'api
        res.status(200).json(new SuccessCollectionResponse(artists, count));
    },

    getById: async (req, res) => {
        // Recuperation l'id depuis la route
        const id = req.params.id;

        // Récuperation des données via le service
        const data = await artistService.getById(id);

        // Envoi d'un erreur 404 si aucunne donnée
        if (!data) {
            res.sendStatus(404);
            return;
        }

        // Envoi des données via le modele de reponse de l'api
        res.json(new SuccessResponse(data));
    },

    add: async (req, res) => {
        // Recuperation des données validées par le middleware "bodyValidation"
        const data = req.validateData;

        // if(! (data.pseudo || (data.lastName && data.firstName)) ) { 
        // Simplification via la loi de morgan
        // https://fr.wikipedia.org/wiki/Lois_de_De_Morgan
        //  ↓
        if (!data.pseudo && !(data.lastName && data.firstName)) {
            res.status(422).json(new InvalidBodyErrorResponse(
                'Invalid Data',
                {
                    pseudo: 'Pseudo is required when firstname and lastname are empty'
                }
            ));
            return;
        }

        // Tester si le pseudo est unique avant l'ajout
        if (data.pseudo && await artistService.checkIfPseudoExists(data.pseudo)) {
            res.status(400).json(new ErrorResponse(
                `The pseudo "${data.pseudo}" already exists !`
            ));
            return;
        }

        const artist = await artistService.add(data);

        res.location('/api/artist/' + artist.id);
        res.status(201).json(new SuccessResponse(artist));
    },

    update: async (req, res) => {
        // Recup de l'id
        const id = req.params.id;

        // Recuperation des données validées par le middleware "bodyValidation"
        const data = req.validateData;

        // Verrification que le pseudo est donné, si on n'a pas le nom et prénom
        if (!data.pseudo && !(data.lastName && data.firstName)) {
            res.status(422).json(new InvalidBodyErrorResponse(
                'Invalid Data',
                {
                    pseudo: 'Pseudo is required when firstname and lastname are empty'
                }
            ));
            return;
        }

        if (data.pseudo) {
            const originalArtist = await artistService.getById(id);
            const pseudoIsModify = originalArtist?.pseudo?.toLowerCase() === data.pseudo.toLowerCase();

            // Tester si le pseudo est unique avant l'ajout
            if (pseudoIsModify && await artistService.checkIfPseudoExists(data.pseudo)) {
                res.status(400).json(new ErrorResponse(
                    `The pseudo "${data.pseudo}" already exists !`
                ));
                return;
            }
        }

        const artist = await artistService.update(id, data);
        console.log(artist);

        if (!artist) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    },

    delete: async (req, res) => {
        const id = req.params.id;

        const isDeleted = await artistService.delete(id);

        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
};

module.exports = artistController;