const artistService = require('../services/artist.service');

const artistController = {
    getAll: async (req, res) => {
        const data = await artistService.getAll();
        res.json(data);
    },

    getById: async (req, res) => {
        const id = req.params.id;

        const data = await artistService.getById(id);

        if (!data) {
            res.sendStatus(404);
            return;
        }
        res.json(data);
    },

    add: async (req, res) => {
        // Pas de validation (Monde des bisounours dans un premier temps 🌈)
        const data = req.body;

        const artist = await artistService.add(data);

        res.location('/api/artist/' + artist.id);
        res.status(201).json(artist);
    },

    update: async (req, res) => {
        // Recup de l'id
        const id = req.params.id;

        // Pas de validation (Monde des bisounours dans un premier temps 🌈)
        const data = req.body;

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