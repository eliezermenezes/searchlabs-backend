'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [{
            username: 'eliezermenezes19@gmail.com',
            name: 'Eliezer dos Santos',
            family_name: 'Menezes',
            role: 'administrator',
            phone: '(92) 99212-4678',
            birthday: '1994-12-11',
            gender: 'male',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
