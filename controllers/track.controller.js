const trackService = require('../services/track.service');
const { SuccessCollectionResponse, SuccessResponse } = require('../api-responses/success-response');


const trackController = {

    getAll: async (req, res) => {
        // Récuperation des infos de pagination
        const { offset, limit } = req.pagination;

        // Obtenir les tracks (en DB) via le service
        const { tracks, count } = await trackService.getAll(offset, limit);

        // Envoi la réponse
        res.status(200).json(new SuccessCollectionResponse(tracks, count));
    },

    getById: async (req, res) => {
        // Récuperation de l'id depuis la route
        const id = req.params.id;

        // Obtenir les infos de la track via le service
        const data = await trackService.getById(id);

        // Si aucunne donnée => Erreur Not found (404)
        if (!data) {
            res.sendStatus(404);
            return;
        }

        // Envoi les données avec l'api reponse
        res.json(new SuccessResponse(data));
    },

    add: async (req, res) => {
        res.sendStatus(501);
    },

    update: async (req, res) => {
        res.sendStatus(501);
    },

    delete: async (req, res) => {
        res.sendStatus(501);
    }
};

module.exports = trackController;