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
    notify_parents: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    notify_staff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    public_event: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preschool_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    tableName: 'Events'
  });

  return Event;
};
