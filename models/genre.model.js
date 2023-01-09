const { DataTypes, Sequelize, ModelCtor } = require('sequelize');

/**
 * Constructeur du modele "Genre"
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<any>}
 */
module.exports = (sequelize) => {

    const Genre = sequelize.define('genre', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'UK_Genre__Name'
            }
        },
        desc: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    }, {
        tableName: 'genre',
        timestamps: false
    });

    return Genre;
};
