const { DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);

Preschool.hasMany(User, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const UsersController = {

  async getAllUsers(req, res) {
    const preschool = req.query.preschool;
    console.log(req.query)
    try {
      if (preschool) {
        const users = await User.findAll({
          where: { preschool_id: preschool }
        });
        return res.json(users);
      }
      else {
        const users = await User.findAll();
        return res.json(users);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (email && password){
        const user = await User.findOne({
          where: { email: email }
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
          const jsontoken = sign(user.toJSON(),"wmkd156skmx40zkm25s81zxc" , { expiresIn: "1h" });
          return res.json({ message: "logged in successfully", jsontoken, user });
        }
        else if (user && !passwordMatch) {
          return res.status(404).json({ message: "Wrong password." });
        }
        else if (!user) {
          return res.status(404).json({ message: "User does not exist." });
        }
      }
      else if (!email) {
        return res.status(404).json({ message: "Email is empty." });
      }
      else if (!password){
        return res.status(404).json({ message: "Password is empty." });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //to register parents in zainab's app
  async register(req, res) {
    //  PRESCHOOL SHOULD BE SET TO NULL AND ROLE TO PARENT (HERE)
    const { email, password, name } = req.body;
    const user = { email, password, name };
    try {
      if (user.email && user.password && user.name) {
        //find user 
        const userFound = await User.findOne({
          where: { email: email }
        });
        if (userFound) {
          return res.status(500).json({ message: "User already exists." })
        }
        // hash password
        user.password = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ email: user.email, password: user.password, role_name: "Parent", name: user.name });
        return res.status(201).json({ message: 'Parent registered successfully', createdUser });
      }
      else {
        return res.status(500).json({ message: "Incomplete information." })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //to create users by admin and create user once preschool request approved
  async createUser(req, res) {
    const { email, password, preschool_id, role_name, name } = req.body;
    const user = { email, password, preschool_id, role_name, name };
    try {
      if (email && password && name && preschool_id && role_name && name) {
        //find user 
        const userFound = await User.findOne({
          where: { email: email }
        });
        if (userFound) {
          return res.status(500).json({ message: "User already exists." })
        }
        // hash password
        user.password = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ email: user.email, password: user.password, preschool_id: user.preschool_id, role_name: user.role_name, name: user.name });
        return res.status(201).json({ message: 'User created successfully', createdUser });
      }
      else {
        return res.status(500).json({ message: "Incomplete information." })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

};

module.exports = UsersController;
