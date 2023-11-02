// Import necessary modules and dependencies
const { DataTypes, Model } = require('sequelize');
const db = require('../seq'); // Use the appropriate Sequelize connection
const User = require('../models/User');

module.exports = (sequelize, DataTypes) => {
  const Preschool = sequelize.define('Preschool', {
      preschool_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      plan_id: {
          type: DataTypes.STRING,
      },
      subscription_expiry_date: {
          type: DataTypes.DATE,
      },
  },
  {
    tableName: 'Preschools' 
  });

  return Preschool;
};
