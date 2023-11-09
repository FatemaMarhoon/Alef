const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const StationaryRequest = require('../models/Stationary_Request')(sequelize, DataTypes);
const Stationary = require('../models/Stationary')(sequelize, DataTypes);
const Staff = require('../models/Staff')(sequelize, DataTypes);

Stationary.hasMany(StationaryRequest, { foreignKey: 'stationary_id' });
StationaryRequest.belongsTo(Staff, { foreignKey: 'staff_id' });
StationaryRequest.belongsTo(Stationary, { foreignKey: 'stationary_id' });

const StationaryRequestController = {
    async getAllStationaryRequests(req, res) {
        try {
            const stationaryRequests = await StationaryRequest.findAll({
                include: Stationary
            });
            res.json(stationaryRequests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStationaryRequestById(req, res) {
        const { request_id } = req.params;
        try {
            const stationaryRequest = await StationaryRequest.findByPk(request_id);
            if (stationaryRequest) {
                res.json(stationaryRequest);
            } else {
                res.status(404).json({ message: 'Stationary Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createStationaryRequest(req, res) {
        const stationaryRequestData = req.body;
        try {
            const stationaryRequest = await StationaryRequest.create(stationaryRequestData);
            res.json({ message: 'Stationary Request created successfully', stationaryRequest });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStationaryRequest(req, res) {
        const { request_id } = req.params;
        const updatedStationaryRequest = req.body;
        try {
            const stationaryRequest = await StationaryRequest.findByPk(request_id);

            if (stationaryRequest) {
                stationaryRequest.set(updatedStationaryRequest);
                await stationaryRequest.save();
                res.json({ message: 'Stationary Request updated successfully', stationaryRequest });
            } else {
                res.status(404).json({ message: 'Stationary Request not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStationaryRequest(req, res) {
        const { request_id } = req.params;
        try {
            const success = await StationaryRequest.destroy({ where: { id: request_id } });
            if (success) {
                res.json({ message: 'Stationary Request deleted successfully' });
            } else {
                res.status(404).json({ message: 'Stationary Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StationaryRequestController;
