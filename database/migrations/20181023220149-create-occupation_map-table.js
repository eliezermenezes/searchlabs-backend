'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('occupation_map', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            reservation_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'reservations',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            date: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            start_hour: {
                allowNull: false,
                type: Sequelize.TIME
            },
            end_hour: {
                allowNull: false,
                type: Sequelize.TIME
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
        return queryInterface.dropTable('occupation_map');
    }
};
