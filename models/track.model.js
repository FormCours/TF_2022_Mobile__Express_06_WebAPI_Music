const { DataTypes, Sequelize, ModelCtor } = require('sequelize');

/**
 * Constructeur du modele "Track"
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<any>}
 */
module.exports = (sequelize) => {
    const Track = sequelize.define('track', {
        id: {
            type: DataTypes.BIGINT(),
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    }, {
        tableName: 'track',
        timestamps: true
    });

    return Track;
};