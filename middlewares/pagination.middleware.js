const { Request, Response, NextFunction } = require('express');

/**
 * Fonction pour générer le middleware "pagination"
 * @param {{defaultLimit: number?, maxLimit: number?}?} options
 * @returns {(req: Request, res: Response, next: NextFunction) => undefined}
 */
const pagination = (options) => {

    // Récuperation des valeurs d'options pour le middleware "pagination"
    const defaultLimit = options?.defaultLimit ?? 20;
    const maxLimit = options?.maxLimit ?? 50;

    /**
     * Middleware de pagination => ?offset=0&limit=20
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    return (req, res, next) => {

        // Récuperation des données dans la "query" de la requete
        const reqOffset = parseInt(req.query.offset);
        const reqLimit = parseInt(req.query.limit);

        // Définition des valeurs de l'offset et de la limit
        const offset = (isNaN(reqOffset) || reqOffset < 0) ? 0 : reqOffset;
        const limit = (isNaN(reqLimit) || reqLimit < 0) ? defaultLimit : Math.min(reqLimit, maxLimit);

        // Ajouter sur l'objet "req" les données de pagination
        req.pagination = { offset, limit };

        // Appel de la fonction "Next"
        next();
    };
};

module.exports = pagination;