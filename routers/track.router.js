const trackController = require('../controllers/track.controller');
const pagination = require('../middlewares/pagination.middleware');

const trackRouter = require('express').Router();

trackRouter.route('/')
    .get(pagination(), trackController.getAll)
    .post(trackController.add);

trackRouter.route('/:id([0-9]+)')
    .get(trackController.getById)
    .put(trackController.update)
    .delete(trackController.delete);

module.exports = trackRouter;