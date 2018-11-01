'use strict';

module.exports = (sequelize, DataTypes) => {
    let Reservation = sequelize.define('reservations', {
        situation   : DataTypes.STRING,
        observation : DataTypes.STRING,
        status      : DataTypes.STRING
    });

    Reservation.associate = (models) => {
        // Associação Solucitação
        Reservation.belongsTo(models.solicitation, { as: 'solicitation', foreignKey: 'solicitation_id' });
    }

    return Reservation;
}