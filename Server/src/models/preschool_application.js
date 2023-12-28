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
      validate: {
        isInt: {
          msg: 'CPR must be an integer',
        },
        len: {
          args: [9, 9],
          msg: 'CPR must be 9 digits in length',
        },
      },
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Phone must be an integer',
        },
        len: {
          args: [8, 8],
          msg: 'Phone must be 8 digits in length',
        },
      },
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
      allowNull: true,
    },
    personal_picture: {
      type: DataTypes.STRING,
      allowNull:false
    },
    certificate_of_birth: {
      type: DataTypes.STRING,
      allowNull:false
    },
    passport: {
      type: DataTypes.STRING,
      allowNull:false
    }
  });

  return Application;
};
