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
            // res.status(500).json({ message: error.message });
        }
    },

};

module.exports = LogsController;
