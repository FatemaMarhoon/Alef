const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq');

module.exports = (sequelize, DataTypes) => {
  const Stationary_Request = sequelize.define('Stationary_Request', {
    status_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Status name cannot be empty',
        },
      },
    },
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
    staff_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Staff ID cannot be empty',
        },
      },
    },
    stationary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stationary ID is required',
        },
        isInt: {
          msg: 'Stationary ID must be an integer',
        },
      },
    },
    requested_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Requested quantity is required',
        },
        isInt: {
          msg: 'Requested quantity must be an integer',
        },
        min: {
          args: [1],
          msg: 'Requested quantity must be at least 1',
        },
      },
    },
    notes: DataTypes.STRING,
  });

  return Stationary_Request;
};
