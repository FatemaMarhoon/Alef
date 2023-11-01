// Import necessary modules and dependencies
const { DataTypes, Model } = require('sequelize');
const db = require('../seq'); // Use the appropriate Sequelize connection
const User = require('../models/User');
class Preschool extends Model {
  static associate(models) {

  }

}

// Initialize the Preschool model with its attributes and settings
Preschool.init({
  preschool_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preschool_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan_id: {
    type: DataTypes.STRING,
  },
  subscription_expiry_date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: db,
  modelName: 'Preschool',
  tableName: 'Preschools', // Set the table name if it's different from the model name
});

// Export the Preschool model
module.exports = Preschool;
