const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/seq');

const Preschool = require('./models/preschool')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);

const router = express.Router();

const UsersController = {
  async getAllUsers(req, res) {
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
      const user = await User.findOne({
        where: { email: email }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id: id }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email }
      });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (user && passwordMatch) {
        const jsontoken = sign(user, "mykey54dev", { expiresIn: "1h" });
        res.json({ message: "logged in successfully", jsontoken });
      } else {
        res.status(404).json({ message: 'Wrong Credintials. Try again.' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
};

module.exports = UsersController;
