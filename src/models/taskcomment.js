'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        user,
        task
      } = models;
      taskComment.belongsTo(user, {
        foreignKey: 'userId',
      });

      taskComment.belongsTo(task, {
        foreignKey: 'taskId',
      });
    }
  };
  taskComment.init({
    taskId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'taskComment',
  });
  return taskComment;
};