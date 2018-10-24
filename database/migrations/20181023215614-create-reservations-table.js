'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reservations', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            solicitation_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'solicitations',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            situation: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['canceled', 'in progress', 'finished'],
                defaultValue: 'in progress'
            },
            observation: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['active', 'inactive'],
                defaultValue: 'active'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('reservations');
    }
};
