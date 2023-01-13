const artistRouter = require('./artist.router');
const authRouter = require('./auth.router');
const genreRouter = require('./genre.router');
const trackRouter = require('./track.router');


const router = require('express').Router();

router.use('/track', trackRouter);
router.use('/artist', artistRouter);
router.use('/genre', genreRouter);
router.use('/auth', authRouter);

module.exports = router;