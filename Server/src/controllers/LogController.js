const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Log = require('../models/log')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);

User.hasMany(Log, { foreignKey: 'user_id' });
Log.belongsTo(User, { foreignKey: 'user_id' });

const LogsController = {
    async getAllLogs(req, res) {
        try {
            const logs = await Log.findAll({
                include: User,
            });
            res.json(logs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createLog(logData, res) {
        try {
            const newLog = await Log.create(logData);
            //   res.json({ message: 'Log created successfully', newLog });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    async updateLog(req, res) {
        const logId = req.params.id;
        const updatedLogData = req.body;
        try {
            const log = await Log.findByPk(logId);

            if (log) {
                log.set(updatedLogData);
                await log.save();

                res.json({ message: 'Log updated successfully', log });
            } else {
                res.status(404).json({ message: 'Log not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteLog(req, res) {
        const logId = req.params.id;
        try {
            const success = await Log.destroy({ where: { id: logId } });

            if (success) {
                res.json({ message: 'Log deleted successfully' });
            } else {
                res.status(404).json({ message: 'Log not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = LogsController;
