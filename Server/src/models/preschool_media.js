const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Preschool_Media = sequelize.define('Preschool_Media', {
    file: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Preschool_Media',
  });

  return Preschool_Media;
};
