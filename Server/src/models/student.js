const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    preschool_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preschool ID is required',
        },
        isInt: {
          msg: 'Preschool ID must be an integer',
        },
      },
    },
    class_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Class ID must be an integer',
        },
      },
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Student name cannot be empty',
        },
      },
    },
    grade: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DOB is required',
        },
        isDate: {
          msg: 'DOB must be a valid date',
        },
      },
    },
    CPR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'CPR is required',
        },
        isInt: {
          msg: 'CPR must be an integer',
        },
        len: {
          args: [9, 9],
          msg: 'CPR must be 9 digits in length',
        },
      },
    },
    contact_number1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Contact number 1 is required',
        },
        isInt: {
          msg: 'Contact number 1 must be an integer',
        },
        len: {
          args: [8, 8],
          msg: 'Contact number 1 must be 8 digits in length',
        },
      },
    },
    contact_number2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Contact number 2 is required',
        },
        isInt: {
          msg: 'Contact number 2 must be an integer',
        },
        len: {
          args: [8, 8],
          msg: 'Contact number 2 must be 8 digits in length',
        },
      },
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Guardian name cannot be empty',
        },
      },
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Enrollment date is required',
        },
        isDate: {
          msg: 'Enrollment date must be a valid date',
        },
      },
    },
    medical_history: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Medical history cannot be empty',
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Gender cannot be empty',
        },
      },
    },
    personal_picture: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    certificate_of_birth: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    passport: {
      type: DataTypes.STRING,
      // allowNull: false
    }
  });

  return Student;
};
