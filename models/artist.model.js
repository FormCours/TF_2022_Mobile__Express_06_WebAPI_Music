const { DataTypes, Sequelize, ModelCtor, Op } = require('sequelize');

/**
 * Constructeur du modele "Artist"
 * @param {Sequelize} sequelize 
 * @returns {ModelCtor<any>}
 */
module.exports = (sequelize) => {
    const Artist = sequelize.define('artist', {
        pseudo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true,
                requiredWithoutName(value) {
                    if (!(this.lastName && this.firstName) && !value) {
                        throw new Error('Pseudo is required when firstname or lastname is null');
                    }
                }
            }
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        indexes: [
            {
                name: 'UK_Artist__Pseudo',
                unique: true,
                fields: ['pseudo'],
                where: {
                    pseudo: {
                        [Op.ne]: null
                    }
                }
            }
        ],
        tableName: 'artist'
    });
    return Artist;
};