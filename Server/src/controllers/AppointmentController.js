const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Appointment = require('../models/appointment')(sequelize, DataTypes);

Appointment.belongsTo(Application, { foreignKey: 'application_id' });
const AppointmentController = {
    async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.findAll({
                include: Application
            });
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving appointments.' });
        }
    },

    async createAppointment(req, res) {
        try {
            const newAppointment = await Appointment.create(req.body);
            res.status(201).json({
                message: 'Appointment created successfully',
                appointment: newAppointment,
            });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create a new appointment. Please check your request data.', message: error.message });
        }
    },

    async getAppointmentById(req, res) {
        const { id } = req.params;
        try {
            const appointment = await Appointment.findByPk(id, {
                include: Application
            });
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found.' });
            }
            res.json(appointment);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving the appointment.', message: error.message });
        }
    },

    async updateAppointment(req, res) {
        const { id } = req.params;
        try {
            const [updatedCount] = await Appointment.update(req.body, {
                where: { id }
            });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Appointment not found for updating.' });
            }
            res.json({ message: 'Appointment updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while updating the appointment.', message: error.message });
        }
    },

    async deleteAppointment(req, res) {
        const { id } = req.params;
        try {
            const deletedCount = await Appointment.destroy({
                where: { id }
            });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Appointment not found for deletion.' });
            }
            res.json({ message: 'Appointment deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while deleting the appointment.', message: error.message });
        }
    },
};

module.exports = AppointmentController;
