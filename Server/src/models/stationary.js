const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Stationary = sequelize.define('Stationary', {
    stationary_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stationary name cannot be empty',
        },
      },
    },
    quantity_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity available is required',
        },
        isInt: {
          msg: 'Quantity available must be an integer',
        },
        min: {
          args: [0],
          msg: 'Quantity available must be at least 0',
        },
      },
    },
  });

  return Stationary;
};
