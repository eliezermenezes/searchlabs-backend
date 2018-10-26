'use strict';

module.exports = (sequelize, DataTypes) => {
    let Laboratory = sequelize.define('laboratories', {
        name        : DataTypes.STRING,
        localization: DataTypes.STRING,
        observation : DataTypes.STRING,
        situation   : DataTypes.STRING,
        status      : DataTypes.STRING
    });

    Laboratory.associate = (models) => {
        // Associação Resources
        Laboratory.hasMany(models.resource, { as: 'resources', foreignKey: 'laboratory_id' });
    }

    return Laboratory;
}