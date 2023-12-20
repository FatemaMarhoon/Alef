const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attendance_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Attendance;
};
