'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [{
            username: 'eliezermenezes19@gmail.com',
            name: 'ELIEZER DOS SANTOS',
            family_name: 'MENEZES',
            role: 'administrator',
            phone: '(92) 99212-4678',
            gender: 'male',
            register: 'complete',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
