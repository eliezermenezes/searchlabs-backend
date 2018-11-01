'use strict';

module.exports = (sequelize, DataTypes) => {
    let OccupationMaps = sequelize.define('occupation_maps', {
        date       : DataTypes.STRING,
        start_hour : DataTypes.STRING,
        end_hour   : DataTypes.STRING
    });

    OccupationMaps.associate = (models) => {
        // Associação Solucitação
        OccupationMaps.belongsTo(models.reservations, { as: 'reservation', foreignKey: 'reservation_id' });
    }

    return OccupationMaps;
}