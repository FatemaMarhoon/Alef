const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Evaluation = require('../models/application_evaluation')(sequelize, DataTypes);

Application.belongsTo(User, { foreignKey: 'user_id' });
Application.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Application.hasOne(Evaluation, { foreignKey: 'application_id' });
Preschool.hasMany(Application, { foreignKey: 'preschool_id' });
const ApplicationController = {
    async getAllApplications(req, res) {
        try {
            const applications = await Application.findAll({
                include: Evaluation
            });
            res.json(applications);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving applications.' });
        }
    },

    async createApplication(req, res) {
        try {
            const newApplication = await Application.create(req.body);
            res.status(201).json({
                message: 'Application created successfully',
                application: newApplication,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getApplicationById(req, res) {
        const { id } = req.params;
        try {
            const application = await Application.findByPk(id, {
                include: Evaluation
            });
            if (!application) {
                return res.status(404).json({ message: 'Application not found.' });
            }
            res.json(application);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving the application.' });
        }
    },

    async updateApplication(req, res) {
        const { id } = req.params;
        try {
            const [updatedCount] = await Application.update(req.body, {
                where: { id }
            });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Application not found for updating.' });
            }
            res.json({ message: 'Application updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteApplication(req, res) {
        const { id } = req.params;
        try {
            const deletedCount = await Application.destroy({
                where: { id }
            });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Application not found for deletion.', message: error.message });
            }
            res.json({ message: 'Application deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while deleting the application.' });
        }
    },
};

module.exports = ApplicationController;
