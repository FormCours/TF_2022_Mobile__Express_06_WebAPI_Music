const artistRouter = require('./artist.router');
const genreRouter = require('./genre.router');
const trackRouter = require('./track.router');


const router = require('express').Router();

router.use('/track', trackRouter);
router.use('/artist', artistRouter);
router.use('/genre', genreRouter);

module.exports = router;