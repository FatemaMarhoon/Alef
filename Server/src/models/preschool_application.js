const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preschool_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guardian_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_CPR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_DOB: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    medical_history: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Application;
};
