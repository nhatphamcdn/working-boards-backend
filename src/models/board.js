'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        task,
        project
      } = models;

      board.hasMany(task);
      board.belongsTo(project, {
        foreignKey: 'projectId',
      });
    }
  };
  board.init({
    name: DataTypes.STRING,
    projectId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'board',
  });
  return board;
};