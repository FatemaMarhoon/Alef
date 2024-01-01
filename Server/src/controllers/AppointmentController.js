const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Appointment = require('../models/appointment')(sequelize, DataTypes);

Appointment.belongsTo(Application, { foreignKey: 'application_id' });

const AppointmentController = {
    async getAllAppointments(req, res) {
        const { preschool } = req.query;
        try {
            if (preschool) {
                const appointments = await Appointment.findAll({
                    where: { preschool_id: preschool },
                    include: Application
                });
                return res.status(200).json(appointments);
            }
            else {
                return res.status(404).json({ message: 'Preschool id must be passed in the query.' });
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async createAppointment(req, res) {
        let { date, time, preschool_id, application_id } = req.body;
        try {
            if (!date) {
                return res.status(404).json({ message: 'Date is Required.' });
            }
            if (!time) {
                return res.status(404).json({ message: 'Time is Required.' });
            }
            if (!preschool_id) {
                return res.status(404).json({ message: 'Preschool Id is Required.' });
            }
            if (!application_id) {
                return res.status(404).json({ message: 'Application Id is Required.' });
            }
            date = new Date(date);
            req.body.date = date.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison later


            const newAppointment = await Appointment.create(req.body);
            res.status(201).json({
                message: 'Appointment created successfully',
                appointment: newAppointment,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            return res.status(200).json(appointment);
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
            res.status(500).json({ message: error.message });
        }
    },

    async updateAppointment(req, res) {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(404).json({ message: 'Appointment Id must be specified.' });
            }

            if (req.body.date) {
                let formattedDate = new Date(req.body.date);
                req.body.date = formattedDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            }

            const [updatedCount] = await Appointment.update(req.body, {
                where: { id: id }
            });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Appointment not found for updating.' });
            }
            res.status(200).json({ message: 'Appointment updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

   

    async availableSlots(req, res) {
        const { preschool, date } = req.query;
        try {
            if (!preschool) {
                return res.status(400).json({ message: 'Please pass preschool as query parameters.' });
            }
            if (!date) {
                return res.status(400).json({ message: 'Please pass date as query parameters.' });
            }

            //dates formatting
            const passedDate = new Date(date).toLocaleDateString(); // format passed date 
            let currentDate = new Date(); 
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            currentDate = currentDate.toLocaleDateString(); //format current date 
            const currentTime = new Date().toLocaleTimeString(); //get current timing 
           
            //if date passed, return error message 
            if (passedDate < currentDate) {
                return res.status(400).json({ message: 'Please select a date in the future.' });
            }

            // Get booked appointments for the specified date
            const bookedAppointments = await Appointment.findAll({
                where: {
                    preschool_id: preschool,
                    date: date,
                },
                attributes: ['time'], // Only retrieve the appointmentTime
            });

            // Extract booked slots from booked appointments
            const bookedSlots = bookedAppointments.map((appointment) => appointment.time);

            // Generate all possible slots
            const allSlots = generateSlots();

            //filter for available slots
            let availableSlots = allSlots.filter((slot) => {
                const formattedSlot = slot + ':00';
                return !bookedSlots.includes(formattedSlot);
            });

            //if it's today, return availble slots after that time
            if (passedDate == currentDate) {
                availableSlots = availableSlots.filter((slot) => {
                    const formattedSlot = slot + ':00';
                    return formattedSlot > currentTime;
                });
            }

            if (availableSlots.length > 0) {
                return res.status(200).json({ availableSlots });
            }
            else {
                return res.status(400).json({ message: 'Fully Booked! Please choose another day.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

};

function generateSlots() {
    const slots = [];
    const startTime = 8;
    const endTime = 12;
    const slotDuration = 30; // in minutes

    let currentTime = new Date();

    currentTime.setHours(startTime, 0, 0, 0);

    while (currentTime.getHours() < endTime) {
        const formattedTime = currentTime.toTimeString().slice(0, 5);
        slots.push(formattedTime);
        currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    return slots;
}


module.exports = AppointmentController;
