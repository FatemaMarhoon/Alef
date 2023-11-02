const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notification_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notification_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Notification;
};
