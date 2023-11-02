const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const Staff = require('../models/Staff')(sequelize, DataTypes);

Class.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Staff.belongsTo(Class, { foreignKey: 'id' });
Preschool.hasMany(Class, { foreignKey: 'preschool_id' });
Class.belongsTo(Staff, { foreignKey: 'id' });
const ClassController = {

    async getAllClasses(req, res) {
        try {
            const classes = await Class.findAll({
                include: [
                    Preschool,
                    Staff
                ]
            });
            res.json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

};

module.exports = ClassController;