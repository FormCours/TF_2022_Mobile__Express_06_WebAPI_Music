const authController = require('../controllers/auth.controller');
const bodyValidation = require('../middlewares/body-validation.middleware');
const { memberLoginValidator, memberRegisterValidator } = require('../validators/member.validator');


const authRouter = require('express').Router();

authRouter.route('/login')
    .post(bodyValidation(memberLoginValidator), authController.login);

authRouter.route('/register')
    .post(bodyValidation(memberRegisterValidator), authController.register);

module.exports = authRouter;