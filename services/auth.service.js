const argon2 = require('argon2');
const memberService = require('./member.service');

const authService = {

    register: async (email, password) => {

        // Hashage du mot de passe
        const hashPassword = await argon2.hash(password, {
            type: 2  // Argon2id
        });

        // Création du membre dans la DB via le memberService
        const member = await memberService.add({
            email,
            hashPassword
        });
        return member;
    },


    login: async (email, password) => {

        // Récuperer le hashPassword lier à l'email
        const hashPassword = await memberService.getHashPassword(email);

        // Si l'email est invalide -> Erreur
        if (!hashPassword) {
            return null;
        }

        // Tester le mot de passe avec le hash
        const isValid = await argon2.verify(hashPassword, password);

        // Si le mot de passe est invalide -> Erreur
        if (!isValid) {
            return null;
        }

        // Envoi des infos du membre
        return await memberService.getByEmail(email);
    }

};

module.exports = authService;