// Import necessary modules and dependencies
const { DataTypes, Model } = require('sequelize');
const db = require('../seq'); // Use the appropriate Sequelize connection
const Preschool = require('./preschool');

// Define the User model
class User extends Model {
  static associate(models) {
    User.belongsTo(Preschool, {
      foreignKey: 'preschool_id',

    });
  }
  static async findAllUsers() {
    try {
      // Use Sequelize's built-in findAll() method to fetch all users
      const users = await this.findAll(); // Use "this" to refer to the model
      return users;
    } catch (error) {
      throw error;
    }
  }
}

// Initialize the User model with its attributes and settings
User.init(
  {
    email: DataTypes.STRING,
    preschool_id: DataTypes.INTEGER,
    role_name: DataTypes.STRING,
    name: DataTypes.STRING,
  },
  {
    sequelize: db, // Use the Sequelize instance
    modelName: 'User',
    tableName: 'Users', // Set the table name if it's different from the model name
  }
);

// Export the User model
module.exports = User;
