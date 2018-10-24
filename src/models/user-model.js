'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        username    : DataTypes.STRING,
        name        : DataTypes.STRING,
        family_name : DataTypes.STRING,
        role        : DataTypes.STRING,
        phone       : DataTypes.STRING,
        birthday    : DataTypes.DATEONLY,
        gender      : DataTypes.STRING,
        avatar      : DataTypes.STRING
    });

    return User;
}