const express = require('express');
const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Address = require('../models/address')(sequelize, DataTypes);
const Student = require('../models/Student')(sequelize, DataTypes);

Preschool.hasMany(User, { foreignKey: 'preschool_id' });
Address.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasOne(Address, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });

const PreschoolController = {
  
  async getAllPreschools(req, res) {
    const searchExpression = req.query.preschool_name;
    console.log(searchExpression)
    try {
      if (searchExpression) {
        const preschools = await Preschool.findAll({
          where: {
            preschool_name: {
              [Op.like]: `%${searchExpression}%`
            }
        }});
        return res.json(preschools);
      }
      else {
        const preschools = await Preschool.findAll({
          include: Address
        });
        return res.json(preschools);
      }
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  },

  async getPreschoolById(req, res) {
    const preschool_id = req.params.id;
    try {
      const preschools = await Preschool.findByPk(preschool_id,{
        include: Address
      });
      res.json(preschools);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while retrieving preschools.' });
    }
  },

  async searchPreschoolByName(req, res) {
    const searchExpression = req.query.params.name;
    try {
      const preschools = await Preschool.findOne({
        where: {
          name: {
              [Op.eq]: searchExpression
          }
      },
        include: Address
      });
      res.json(preschools);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while retrieving preschools.' });
    }
  },

  async createPreschool(req, res) {
    try {
      const preschoolData = req.body;
      const newPreschool = await Preschool.create(preschoolData);
      res.status(201).json({
        message: 'Preschool created successfully',
        preschool: newPreschool,
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create a new preschool. Please check your request data.', error: error.message });
    }
  },
  //this doesnt work correctly, it needs to be created after approving reuqest
  // async createPreschool(req, res) {
  //   const preschoolData = req.body;
  //   try {
  //     const newPreschool = await Preschool.create(preschoolData);
  //     res.status(201).json({
  //       message: 'Preschool created successfully',
  //       preschool: newPreschool,
  //     });
  //   } catch (error) {
  //     res.status(400).json({ message: 'Failed to create a new preschool. Please check your request data.', message: error.message });
  //   }
  // },
  //   // In your PreschoolController
  // async createPreschoolAfterApproval(req, res) {
  //   const preschoolData = req.body; // You may need to modify this data based on your request approval logic
  //   try {
  //     // Implement your approval logic here, and then create the preschool
  //     const newPreschool = await Preschool.create(preschoolData);
  //     res.status(201).json({
  //       message: 'Preschool created successfully after request approval',
  //       preschool: newPreschool,
  //     });
  //   } catch (error) {
  //     res.status(400).json({ message: 'Failed to create a new preschool after request approval. Please check your request data.', error: error.message });
  //   }
  // }


  async updatePreschool(req, res) {
    const preschoolId = req.params.id;
    const updatedPreschoolData = req.body;
    try {
      const preschool = await Preschool.findByPk(preschoolId);

      if (preschool) {
        preschool.set(updatedPreschoolData);
        await preschool.save();

        res.json({ message: 'Preschool updated successfully', preschool: preschool });
      } else {
        res.status(404).json({ message: 'Preschool not found or no changes made' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while updating the preschool.' });
    }
  },

  async deletePreschool(req, res) {
    const preschoolId = req.params.id;
    try {
      const success = await Preschool.destroy({ where: { id: preschoolId } });

      if (success) {
        res.json({ message: 'Preschool deleted successfully' });
      } else {
        res.status(404).json({ message: 'Preschool not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while deleting the preschool.' });
    }
  },
};

module.exports = PreschoolController;
