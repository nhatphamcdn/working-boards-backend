'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  history.init({
    name: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT('tiny')
    },
    historyableId: {
      type: DataTypes.INTEGER
    },
    historyableType: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};