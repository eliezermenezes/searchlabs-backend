'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('solicitations', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
            class_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'classes',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            end_date: {
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
            repeate: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['yes', 'no'],
                defaultValue: 'no'
            },
            days_week: {
                allowNull: true,
                type: Sequelize.STRING(200)
            },
            observation: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            situation: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['canceled', 'accepted', 'refused', 'opened'],
                defaultValue: 'opened'
            },
            answer_date: {
                allowNull: true,
                type: Sequelize.DATE
            },
            answer_description: {
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
        return queryInterface.dropTable('solicitations');
    }
};
