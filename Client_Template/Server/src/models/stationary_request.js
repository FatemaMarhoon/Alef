const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Stationary_Request = sequelize.define('Stationary_Request', {
    status_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stationary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    requested_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: DataTypes.STRING,
  });

  return Stationary_Request;
};
