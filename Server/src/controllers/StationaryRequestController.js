const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const StationaryRequest = require('../models/Stationary_Request')(sequelize, DataTypes);
const Stationary = require('../models/stationary')(sequelize, DataTypes);
const Staff = require('../models/staff')(sequelize, DataTypes);

Stationary.hasMany(StationaryRequest, { foreignKey: 'stationary_id' });
StationaryRequest.belongsTo(Staff, { foreignKey: 'staff_id' });
StationaryRequest.belongsTo(Stationary, { foreignKey: 'stationary_id' });


const validateStationaryRequestData = (stationaryRequestData) => {

    const requiredFields = ['status_name', 'staff_id', 'stationary_id', 'requested_quantity'];
    for (const field of requiredFields) {
        if (!stationaryRequestData[field]) {
            return { isValid: false, message: `${field} is required` };
        }
    }

    // Additional validations for specific fields
    if (stationaryRequestData.requested_quantity < 1) {
        return { isValid: false, message: 'Requested quantity must be at least 1' };
    }

    // Add more validations as needed

    return { isValid: true };
}

const StationaryRequestController = {
    async getAllStationaryRequests(req, res) {
        try {
            const { preschoolId } = req.params;

            const stationaryRequests = await StationaryRequest.findAll({
                where: { preschool_id: preschoolId },

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
        // Perform validations
        const validation = validateStationaryRequestData(stationaryRequestData);

        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
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
        // Perform validations
        const validation = validateStationaryRequestData(updatedStationaryRequest);

        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
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
