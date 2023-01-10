const genreController = require('../controllers/genre.controller');


const genreRouter = require('express').Router();

genreRouter.route('/')
    .get(genreController.getAll)
    .post(genreController.add);

genreRouter.route('/:id([0-9]+)')
    .get(genreController.getById);

genreRouter.route('/search/:name([a-zA-Z]+)')
    .get(genreController.searchByName);

module.exports = genreRouter;