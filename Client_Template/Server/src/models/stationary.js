const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Stationary = sequelize.define('Stationary', {
    stationary_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Stationary;
};
