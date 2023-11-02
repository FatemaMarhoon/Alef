const User = require('../models/user');

const UsersController = {
  async getAllUsers(req, res) {
    console.log("controller function called");
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findByEmail(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    const { email, preschool_id, role_name, name } = req.body;
    console.log(req.body.email);
    const user = { email, preschool_id, role_name, name };
    try {
      const userId = await User.create(user);
      res.json({ message: 'User created successfully', userId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    const { email } = req.params;
    const updatedUser = req.body;
    try {
      const success = await User.update(email, updatedUser);
      if (success) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    const { email } = req.params;
    try {
      const success = await User.delete(email);
      if (success) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = UsersController;
