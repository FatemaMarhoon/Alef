'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Static_Values extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Static_Values.init({
    CategoryName: DataTypes.STRING,
    ValueName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Static_Values',
  });
  return Static_Values;
};