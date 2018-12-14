'use strict';

module.exports = (sequelize, DataTypes) => {
    let Solicitation = sequelize.define('solicitation', {
        start_date  : DataTypes.DATEONLY,
        end_date    : DataTypes.DATEONLY,
        start_hour  : DataTypes.TIME,
        end_hour    : DataTypes.TIME,
        repeate     : DataTypes.STRING,
        days_week   : DataTypes.STRING,
        observation : DataTypes.STRING,
        situation   : DataTypes.STRING,
        answer_date : DataTypes.DATE,
        answer_description: DataTypes.STRING,
        status      : DataTypes.STRING
    }, {});

    Solicitation.associate = (models) => {
        // Associação Laboratory
        Solicitation.belongsTo(models.laboratories, { as: 'laboratory', foreignKey: 'laboratory_id' });
        // Associação Turma
        Solicitation.belongsTo(models.classe, { as: 'class', foreignKey: 'class_id' });
    }

    return Solicitation;
}
