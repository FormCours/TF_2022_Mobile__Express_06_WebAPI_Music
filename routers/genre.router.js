const genreController = require('../controllers/genre.controller');
const bodyValidation = require('../middlewares/body-validation.middleware');
const pagination = require('../middlewares/pagination.middleware');
const { genreValidator } = require('../validators/genre.validator');


const genreRouter = require('express').Router();

genreRouter.route('/')
    .get(pagination({ defaultLimit: 5 }), genreController.getAll)
    .post(bodyValidation(genreValidator), genreController.add);

genreRouter.route('/:id([0-9]+)')
    .get(genreController.getById);

genreRouter.route('/search/:name([a-zA-Z]+)')
    .get(pagination(), genreController.searchByName);

module.exports = genreRouter;