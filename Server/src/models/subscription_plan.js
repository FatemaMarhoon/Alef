const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Subscription_Plan = sequelize.define('Subscription_Plan', {
    monthly_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan_description: {
      type: DataTypes.STRING,
    },
  });

  return Subscription_Plan;
};
