'use strict';

module.exports = (sequelize, DataTypes) => {
    let Resource = sequelize.define('resource', {
        description : DataTypes.STRING,
        quantity    : DataTypes.INTEGER,
        status      : DataTypes.STRING
    }, {});

    Resource.associate = (models) => {
        // Associação Laboratory
        Resource.belongsTo(models.laboratories, { as: 'laboratory', foreignKey: 'laboratory_id' });
    }

    return Resource;
}