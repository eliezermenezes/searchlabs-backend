'use strict';

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        username    : DataTypes.STRING,
        name        : DataTypes.STRING,
        family_name : DataTypes.STRING,
        role        : DataTypes.STRING,
        phone       : DataTypes.STRING,
        birthday    : DataTypes.DATEONLY,
        gender      : DataTypes.STRING,
        avatar      : DataTypes.STRING,
        status      : DataTypes.STRING
    }, {});

    User.associate = (models) => {
        // Associação Class
        User.hasMany(models.classe, { as: 'classes', foreignKey: 'teacher' });

        User.belongsToMany(models.classe, {
            as: 'turmas',
            through: 'class_users',
            foreignKey: 'user_id'
        });

    }

    return User;
}