'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachmentable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        attachment
      } = models;

      attachmentable.belongsTo(attachment, {
        foreignKey: 'attachmentId',
        as: 'uploadBy',
      });
    }
  };
  attachmentable.init({
    attachmentId: {
      type: DataTypes.INTEGER
    },
    attachmentableId: {
      type: DataTypes.INTEGER
    },
    attachmentableType: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'attachmentable',
  });
  return attachmentable;
};