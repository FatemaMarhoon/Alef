const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);


Application.belongsTo(User, { foreignKey: 'user_id' });
Application.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Application, { foreignKey: 'preschool_id' });

//const Application = require('../models/application');

const ApplicationController = {
    async getAllApplications(req, res) {
        console.log("controller function called");
        try {
            const applications = await Application.findAll(
                {
                    include: Preschool
                }
            ); // Update to use Application model
            res.json(applications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ApplicationController;