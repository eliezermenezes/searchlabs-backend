'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable('resources', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            laboratory_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'laboratories',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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
        queryInterface.dropTable('resources');
    }
};
