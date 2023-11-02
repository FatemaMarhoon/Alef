const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Log;
};
