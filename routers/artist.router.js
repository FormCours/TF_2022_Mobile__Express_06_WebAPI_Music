const artistController = require('../controllers/artist.controller');
const authentificate = require('../middlewares/authentificate.middleware');
const bodyValidation = require('../middlewares/body-validation.middleware');
const pagination = require('../middlewares/pagination.middleware');
const { artistValidator } = require('../validators/artist.validator');


const artistRouter = require('express').Router();

artistRouter.route('/')
    .get(pagination(), artistController.getAll)
    .post(authentificate(), bodyValidation(artistValidator), artistController.add)
    .all((req, res) => res.sendStatus(405));

artistRouter.route('/:id([0-9]+)')
    .get(artistController.getById)
    .put(authentificate(), bodyValidation(artistValidator), artistController.update)
    .delete(authentificate({ adminOnly: true }), artistController.delete)
    .all((req, res) => res.sendStatus(405));

module.exports = artistRouter;