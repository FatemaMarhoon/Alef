const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fees: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATE,
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
