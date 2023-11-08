const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    preschool_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CPR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_number1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_number2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    medical_history: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Student;
};
