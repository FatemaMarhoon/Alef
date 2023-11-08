const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');


const Report = require('../models/report')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Preschool.hasMany(Report, { foreignKey: 'preschool_id' });
Report.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const ReportsController = {
    async getAllReports(req, res) {
        try {
            const reports = await Report.findAll({
                include: Preschool,
            });
            res.json(reports);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ReportsController;