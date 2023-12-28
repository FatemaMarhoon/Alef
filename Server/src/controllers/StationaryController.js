const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Stationary = require('../models/stationary')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Preschool.hasMany(Stationary, { foreignKey: 'preschool_id' });
Stationary.belongsTo(Preschool, { foreignKey: 'preschool_id' });


const LogsController = require('./LogController');
const UsersController = require('./UsersController');


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
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            //create log
            await LogsController.createLog({
                type: 'Stationary Creation',
                original_values: JSON.stringify(stationaryData),
                current_values: JSON.stringify(stationaryData),
                user_id: user_id
            });


            const stationary = await Stationary.create(stationaryData);
            res.json({ message: 'Stationary item created successfully', stationary });
        } catch (error) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(stationaryData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
                //user_id: 28
            });
            res.status(500).json({ message: error.message });
        }
    },

    async updateStationary(req, res) {
        const stationaryId = req.params.stationary_id;
        const updatedStationaryData = req.body;
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const stationary = await Stationary.findByPk(stationaryId);

            if (stationary) {
                const originalValues = JSON.stringify(stationary.toJSON()); // Store the original values before the update

                stationary.set(updatedStationaryData); // Update stationary properties
                await stationary.save();
                const newValues = JSON.stringify(stationary.toJSON()); // Store the updated values after the update
                // Create a log entry for the student update
                await LogsController.createLog({
                    type: 'Stationary Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });

                res.json({ message: 'Stationary item updated successfully', stationary });
            } else {
                res.status(404).json({ message: 'Stationary item not found' });
            }
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStationaryData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStationary(req, res) {
        const { stationary_id } = req.params;
        const user_id = await UsersController.getCurrentUser(req, res);
        let deletedStationaryData; // Declare the variable outside the block

        try {
            const stationary = await Stationary.findByPk(stationary_id);

            if (stationary) {
                deletedStationaryData = JSON.stringify(stationary.toJSON()); // Store the student data before deletion

                const success = await Stationary.destroy({ where: { id: stationary_id } });

                if (success) {
                    // Create a log entry for the student deletion
                    await LogsController.createLog({
                        type: 'Stationary Deletion',
                        original_values: deletedStationaryData,
                        current_values: 'Stationary deleted',
                        user_id: user_id
                    });

                    res.json({ message: 'Stationary deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Stationary not found' });
                }
            } else {
                res.status(404).json({ message: 'Stationary not found' });
            }
        } catch (error) {
            if (deletedStationaryData) {
                // Create a log entry for the error if deletedStudentData is defined
                await LogsController.createLog({
                    type: 'Error',
                    original_values: deletedStationaryData,
                    current_values: JSON.stringify({ error: error.message }),
                    user_id: user_id
                });
            } else {
                // Handle the error if deletedStudentData is not defined
                console.error('Error deleting Stationary:', error);
            }

            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StationaryController;
