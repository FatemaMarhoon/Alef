const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_values: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    current_values: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set the timestamp to the current date and time
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,

    },
  });

  return Log;
};
