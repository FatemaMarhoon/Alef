const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Stationary = require('../models/stationary')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Preschool.hasMany(Stationary, { foreignKey: 'preschool_id' });
Stationary.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const StationaryController = {

    async getAllStationary(req, res) {
        try {
            const { preschoolId } = req.params;
            const stationary = await Stationary.findAll({
                where: { preschool_id: preschoolId },

                include: Preschool
            });
            res.json(stationary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStationaryById(req, res) {
        const { stationary_id } = req.params;
        try {
            const stationary = await Stationary.findByPk(stationary_id);
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
            const stationary = await Stationary.create(stationaryData);
            res.json({ message: 'Stationary item created successfully', stationary });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStationary(req, res) {
        const stationaryId = req.params.stationary_id;
        const updatedStationaryData = req.body;

        try {
            const stationary = await Stationary.findByPk(stationaryId);

            if (stationary) {
                stationary.set(updatedStationaryData); // Update stationary properties
                await stationary.save();

                res.json({ message: 'Stationary item updated successfully', stationary });
            } else {
                res.status(404).json({ message: 'Stationary item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStationary(req, res) {
        const { stationary_id } = req.params;
        try {
            const success = await Stationary.destroy({ where: { id: stationary_id } });
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
