const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Appointment = require('../models/appointment')(sequelize, DataTypes);

Appointment.belongsTo(Application, { foreignKey: 'application_id' });

const AppointmentController = {
    async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.findAll(
                {
                    include: Application
                }
            ); 
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = AppointmentController;