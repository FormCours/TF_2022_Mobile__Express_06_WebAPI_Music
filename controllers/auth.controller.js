const { ErrorResponse } = require('../api-responses/error-response');
const authService = require('../services/auth.service');
const { generateJWT } = require('../utils/jwt.utils');


const authController = {

    register: async (req, res) => {
        // Récuperation des infos du body (validé par le middleware)
        const { email, password } = req.validateData;

        // Appel du service
        const data = await authService.register(email, password);

        // Envoyer une réponse
        if (!data) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(204);
    },

    login: async (req, res) => {
        // Récuperation des infos du body (validé par le middleware)
        const { email, password } = req.validateData;

        // Appel du service
        const data = await authService.login(email, password);

        // Erreur de login
        if (!data) {
            res.status(400).json(new ErrorResponse('Bad credential'));
            return;
        }

        // Génération du token 
        const token = await generateJWT(data);

        // Envoyer une réponse
        res.status(200).json({ token });
    }

};

module.exports = authController;