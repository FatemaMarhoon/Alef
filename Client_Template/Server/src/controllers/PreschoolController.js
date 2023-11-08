const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Address = require('../models/address')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);


Preschool.hasMany(User, { foreignKey: 'preschool_id' });
Preschool.belongsTo(Address, { foreignKey: 'address_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });

const PreschoolController = {
    async getAllPreschools(req, res) {
        try {
          const preschools = await Preschool.findAll({
            include: Student
          });
          res.json(preschools);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
};

module.exports = PreschoolController;
