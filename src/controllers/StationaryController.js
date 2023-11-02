const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Stationary = require('../models/Stationary')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);


Preschool.hasMany(Stationary, { foreignKey: 'preschool_id' });
Stationary.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const StationaryController = {
    async getAllStationary(req, res) {
        try {
            const stationary = await Stationary.findAll(
                {
                    include: Preschool
                }
            );
            res.json(stationary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStationaryById(req, res) {
        const { stationary_id } = req.params;
        try {
            const stationary = await Stationary.findByStationaryId(stationary_id);
            if (stationary) {
                res.json(stationary);
            } else {
                res.status(404).json({ message: 'Stationary item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createStationary(req, res) {
        const stationaryData = req.body;
        try {
            const stationaryId = await Stationary.create(stationaryData);
            res.json({ message: 'Stationary item created successfully', stationaryId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStationary(req, res) {
        const { stationary_id } = req.params;
        const updatedStationary = req.body;
        try {
            const success = await Stationary.update(stationary_id, updatedStationary);
            if (success) {
                res.json({ message: 'Stationary item updated successfully' });
            } else {
                res.status(404).json({ message: 'Stationary item not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStationary(req, res) {
        const { stationary_id } = req.params;
        try {
            const success = await Stationary.delete(stationary_id);
            if (success) {
                res.json({ message: 'Stationary item deleted successfully' });
            } else {
                res.status(404).json({ message: 'Stationary item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StationaryController;
