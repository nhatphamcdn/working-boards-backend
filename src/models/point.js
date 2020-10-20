'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        project
      } = models;
      point.hasOne(project);
    }
  };
  point.init({
    name: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'point',
  });
  return point;
};