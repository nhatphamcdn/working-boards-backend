'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {
        user,
        attachmentable
      } = models;

      attachment.belongsTo(user, {
        foreignKey: 'userId',
        as: 'uploadBy',
      });

      attachment.hasOne(attachmentable);
    }
  };
  attachment.init({
    url: {
      type: DataTypes.TEXT('tiny')
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'attachment',
  });
  return attachment;
};