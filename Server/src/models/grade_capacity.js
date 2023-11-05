const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Grade_Capacity = sequelize.define('Grade_Capacity', {
    preschool_id: {
      type: DataTypes.INTEGER,
    },
    grade: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Grade_Capacity',
  });

  return Grade_Capacity;
};
