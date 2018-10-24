'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable('laboratories', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(200)
            },
            localization: {
                allowNull: true,
                type: Sequelize.STRING(200)
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['active', 'inactive'],
                defaultValue: 'active'
            },
            situation: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['ok', 'in maintenance'],
                defaultValue: 'ok'
            },
            observation: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: (queryInterface) => {
        queryInterface.dropTable('laboratories');
    }
};