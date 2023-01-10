const artistController = require('../controllers/artist.controller');


const artistRouter = require('express').Router();

artistRouter.route('/')
    .get(artistController.getAll)
    .post(artistController.add)
    .all((req, res) => res.sendStatus(405));

artistRouter.route('/:id([0-9]+)')
    .get(artistController.getById)
    .put(artistController.update)
    .delete(artistController.delete)
    .all((req, res) => res.sendStatus(405));

module.exports = artistRouter;