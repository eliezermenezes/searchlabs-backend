'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(200)
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(125)
            },
            family_name: {
                allowNull: false,
                type: Sequelize.STRING(125)
            },
            role: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['teacher', 'student', 'administrator']
            },
            phone: {
                allowNull: true,
                type: Sequelize.STRING(15)
            },
            birthday: {
                allowNull: true,
                type: Sequelize.DATEONLY
            },
            gender: {
                allowNull: true,
                type: Sequelize.ENUM,
                values: ['male', 'female']
            },
            register: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['complete', 'incomplete'],
                defaultValue: 'incomplete'
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
        })
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    }
};