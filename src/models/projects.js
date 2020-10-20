'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        user,
        projectUsers,
        board
      } = models;
      projects.belongsTo(user, {
        foreignKey: 'createdBy',
      });

      projects.belongsToMany(user, {
        through: projectUsers
      });

      projects.hasMany(board);
    }
  };
  Projects.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'unactive'),
      defaultValue: 'unactive'
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    pointId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'project',
  });
  return Projects;
};