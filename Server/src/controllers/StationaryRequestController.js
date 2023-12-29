const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const StationaryRequest = require('../models/stationary_request')(sequelize, DataTypes);
const Stationary = require('../models/stationary')(sequelize, DataTypes);
const Staff = require('../models/staff')(sequelize, DataTypes);

Stationary.hasMany(StationaryRequest, { foreignKey: 'stationary_id' });
StationaryRequest.belongsTo(Staff, { foreignKey: 'staff_id' });
StationaryRequest.belongsTo(Stationary, { foreignKey: 'stationary_id' });

const LogsController = require('./LogController');
const UsersController = require('./UsersController');
const NotificationController = require('./NotificationController');


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
        const user_id = await UsersController.getCurrentUser(req, res);

        if (!validation.isValid) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(stationaryRequestData),
                current_values: JSON.stringify({ error: validation.message }),
                user_id: user_id
                //user_id: 28
            });
            return res.status(400).json({ message: validation.message });
        }
        try {
            //create log
            await LogsController.createLog({
                type: 'Stationary Req Creation',
                original_values: JSON.stringify(stationaryRequestData),
                current_values: JSON.stringify(stationaryRequestData),
                user_id: user_id
            });
            const stationaryRequest = await StationaryRequest.create(stationaryRequestData);

            // const title = 'New Stationary Request';
            // const body = `New stationary request`;
            // await NotificationController.pushWebNotification(user_id, title, body);

            res.json({ message: 'Stationary Request created successfully', stationaryRequest });
        } catch (error) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(stationaryRequestData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
                //user_id: 28
            });
            res.status(500).json({ message: error.message });
        }
    },

    async updateStationaryRequest(req, res) {
        const { request_id } = req.params;
        const updatedStationaryRequest = req.body;
        // Perform validations
        const validation = validateStationaryRequestData(updatedStationaryRequest);
        const user_id = await UsersController.getCurrentUser(req, res);

        if (!validation.isValid) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStationaryRequest),
                current_values: JSON.stringify({ error: validation.message }),
                user_id: user_id
                //user_id: 28
            });
            return res.status(400).json({ message: validation.message });
        }
        try {

            const stationaryRequest = await StationaryRequest.findByPk(request_id);

            if (stationaryRequest) {
                const originalValues = JSON.stringify(stationaryRequest.toJSON()); // Store the original values before the update

                stationaryRequest.set(updatedStationaryRequest);
                await stationaryRequest.save();

                const newValues = JSON.stringify(stationaryRequest.toJSON()); // Store the updated values after the update
                // Create a log entry for the student update
                await LogsController.createLog({
                    type: 'Stationary Req Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });
                // const title = 'Stationary Request Status Updated';
                // const body = `Rquest is ${stationaryRequest.status_name}`;
                // await NotificationController.pushSingleNotification(user.email, title, body);

                res.json({ message: 'Stationary Request updated successfully', stationaryRequest });
            } else {
                res.status(404).json({ message: 'Stationary Request not found or no changes made' });
            }
        } catch (error) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStationaryRequest),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
                //user_id: 28
            });
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStationaryRequest(req, res) {
        const { request_id } = req.params;
        const user_id = await UsersController.getCurrentUser(req, res);
        let deletedStationaryReqData; // Declare the variable outside the block

        try {
            const stationaryReq = await StationaryRequest.findByPk(request_id);

            if (stationaryReq) {
                deletedStationaryReqData = JSON.stringify(stationaryReq.toJSON()); // Store the student data before deletion

                const success = await StationaryRequest.destroy({ where: { id: request_id } });

                if (success) {
                    // Create a log entry for the student deletion
                    await LogsController.createLog({
                        type: 'Stationary Req Deletion',
                        original_values: deletedStationaryReqData,
                        current_values: 'Stationary Req deleted',
                        user_id: user_id
                    });

                    res.json({ message: 'Stationary Req deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Stationary Req not found' });
                }
            } else {
                res.status(404).json({ message: 'Stationary Req not found' });
            }
        } catch (error) {
            if (deletedStationaryReqData) {
                // Create a log entry for the error if deletedStudentData is defined
                await LogsController.createLog({
                    type: 'Error',
                    original_values: deletedStationaryReqData,
                    current_values: JSON.stringify({ error: error.message }),
                    user_id: user_id
                });
            } else {
                // Handle the error if deletedStudentData is not defined
                console.error('Error deleting Stationary Req:', error);
            }

            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StationaryRequestController;
