'use strict';

module.exports = (sequelize, DataTypes) => {
    let Topic = sequelize.define('topic', {
        description : DataTypes.STRING,
        status      : DataTypes.STRING
    }, {});

    Topic.associate = (models) => {
        // Associação Classes
        Topic.belongsTo(models.classe, { as: 'class', foreignKey: 'class_id' });
    }

    return Topic;
}