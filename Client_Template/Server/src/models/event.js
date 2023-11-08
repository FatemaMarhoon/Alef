const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notify_parents: DataTypes.BOOLEAN,
    notify_staff: DataTypes.BOOLEAN,
    public_event: DataTypes.BOOLEAN,
    notes: DataTypes.STRING,
  });

  return Event;
};
