'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        user,
        status,
        board
      } = models;
      task.belongsTo(user, {
        foreignKey: 'createdBy',
        as: 'created_by'
      });
      task.belongsTo(user, {
        foreignKey: 'requestBy',
        as: 'request_by'
      });
      task.belongsTo(user, {
        foreignKey: 'assignTo',
        as: 'assign_to'
      });
      task.belongsTo(status, {
        foreignKey: 'statusId',
      });
      task.belongsTo(board, {
        foreignKey: 'boardId',
      });
    }
  };
  task.init({
    name: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT('tiny')
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    requestBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
    },
    boardId: {
      type: DataTypes.INTEGER,
    },
    estimatePoint: {
      type: DataTypes.TINYINT,
    },
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};