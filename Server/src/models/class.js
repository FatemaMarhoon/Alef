const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preschool_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supervisor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    classroom: DataTypes.STRING,
  });

  return Class;
};
