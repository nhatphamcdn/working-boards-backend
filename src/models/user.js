'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        project,
        projectUser,
        attachment
      } = models;
      user.belongsToMany(project, {
        through: projectUser
      });

      users.hasMany(attachment, {
        as: 'attachments'
      })
    }
  };
  user.init({
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};