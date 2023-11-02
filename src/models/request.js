const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    plan_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preschool_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representitive_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CR: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Request;
};
