// Import necessary modules and dependencies
const { DataTypes, Model } = require('sequelize');
const db = require('../seq'); // Use the appropriate Sequelize connection
const Preschool = require('./preschool');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  User.associate = (models) => {
      User.belongsTo(models.Preschool, { foreignKey: 'preschool_id' });
  };

  return User;
};
