const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

// Import necessary modules and dependencies
module.exports = (sequelize, DataTypes) => {
  const Preschool = sequelize.define('Preschool', {
    preschool_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.STRING,
    },
    request_id: {
      type: DataTypes.STRING,
    },
    subscription_expiry_date: {
      type: DataTypes.DATE,
    },
    minimum_age: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    maximum_age: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    monthly_fees: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    cirriculum: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    registration_fees: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    representitive_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    CR: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      tableName: 'Preschools'
    });

  return Preschool;
};
