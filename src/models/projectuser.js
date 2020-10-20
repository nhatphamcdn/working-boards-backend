'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        user,
        status
      } = models;

      projectUser.belongsTo(status, {
        foreignKey: 'statusId',
        as: 'status'
      });

      projectUser.belongsTo(user, {
        foreignKey: 'addBy',
        as: 'add_by_user'
      });
    }
  };
  projectUser.init({
    projectId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    statusId: {
      type: DataTypes.INTEGER,
    },
    addBy: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'projectUser',
  });
  return projectUser;
};