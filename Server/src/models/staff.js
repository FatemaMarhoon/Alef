const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
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
    staff_role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Staff role name cannot be empty',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty',
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
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number is required',
        },
        isInt: {
          msg: 'Phone number must be an integer',
        },
        len: {
          args: [8, 8],
          msg: 'Phone number must be 8 digits in length',
        },
      },
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Hire date is required',
        },
        isDate: {
          msg: 'Hire date must be a valid date',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email format',
        },
      },
    },
  });

  return Staff;
};
