'use strict';

module.exports = (sequelize, DataTypes) => {
    let ClassUsers = sequelize.define('class_users', {}, {});

    ClassUsers.associate = (models) => {
        //ClassUsers.belongsTo(models.user, { foreignKey: 'user_id' });
        //ClassUsers.belongsTo(models.classe, { foreignKey: 'class_id' });
    }

    return ClassUsers;
}