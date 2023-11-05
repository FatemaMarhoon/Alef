const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const { sign } = require('jsonwebtoken')
const bcrypt  =  require('bcryptjs')

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);

Preschool.hasMany(User, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });

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

  //to register parents in zainab's app
  async register(req, res) {
    //  PRESCHOOL SHOULD BE SET TO NULL AND ROLE TO PARENT (HERE)
    
  },

  //to create users by admin and create user once preschool request approved
  async createUser(req, res) {
    const { email, password, preschool_id, role_name, name } = req.body;
    const user = { email, password, preschool_id, role_name, name };
    try {
      //find user 
      const userFound = await User.findOne({
        where: { email: email }
      });
      if (userFound) {
        res.status(500).json({ message: "User already exists." })
      }
      // hash password
      user.password = await bcrypt.hash(password,10);
       const createdUser = await User.create({ email:user.email, password:user.password, preschool_id:user.preschool_id, role_name:user.role_name, name:user.name });
        res.status(201).json({ message: 'User created successfully', createdUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
 
};

module.exports = UsersController;
