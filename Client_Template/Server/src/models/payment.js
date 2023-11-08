const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fees: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: DataTypes.STRING,
    paid_on: DataTypes.DATE,
  });

  return Payment;
};
