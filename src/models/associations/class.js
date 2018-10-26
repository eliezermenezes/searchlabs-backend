'use strict';

module.exports = (sequelize, DataTypes) => {
    let Class = sequelize.define('classe', {
        name        : DataTypes.STRING,
        code        : DataTypes.STRING,
        institution : DataTypes.STRING,
        status      : DataTypes.STRING
    }, {});

    Class.associate = (models) => {
        // Associação User
        Class.belongsTo(models.user, { as: 'instructor', foreignKey: 'teacher' });
        // Associação Topics
        Class.hasMany(models.topic, { as: 'topics', foreignKey: 'class_id'});

        // Associação Users
        Class.belongsToMany(models.user, {
            as: 'students',
            through: 'class_users',
            foreignKey: 'class_id'
        });
    }

    return Class;
}