const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Event_Class = sequelize.define('Event_Class', {
    
  });

  return Event_Class;
};
