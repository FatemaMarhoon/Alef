const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Appointment = require('../models/appointment')(sequelize, DataTypes);

Appointment.belongsTo(Application, { foreignKey: 'application_id' });
const AppointmentController = {
    async getAllAppointments(req, res) {
        const {preschool} = req.query;
        try {
            if (preschool) {
                const appointments = await Appointment.findAll({
                    where : {preschool_id:preschool},
                    include: Application
                });
                return res.status(200).json(appointments);
            }
            else {
                return res.status(404).json({ message: 'Preschool id must be passed in the query.' });
            }
            
        } catch (error) {
            return res.status(500).json({ message: error.message});
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

    async availableSlots(req, res) {
        const { preschool, date } = req.query;
        console.log("Date in slots: ", date)
        try {
            if (!preschool) {
                return res.status(400).json({ message: 'Please pass preschool as query parameters.' });
            }
            if (!date) {
                return res.status(400).json({ message: 'Please pass date as query parameters.' });
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
                console.log(formattedSlot)
                return !bookedSlots.includes(formattedSlot);
            });

            //verify that returned slots are all in future
            const passedDate = new Date(date).toLocaleDateString; // Replace this with your actual passed date
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            currentDate = currentDate.toLocaleDateString();
            console.log("current date:", currentDate)
            const currentTime = new Date().toLocaleTimeString();
            console.log("current time:", currentTime)

            if (passedDate < currentDate) {
                console.log("PASSED:", passedDate)
                console.log("CURRENT:", currentDate)
                return res.status(400).json({ message: 'Please select a date in the future.' });
            }
            else if (passedDate == currentDate) {
                availableSlots = availableSlots.filter((slot) => {
                    const formattedSlot = slot + ':00';
                    return formattedSlot > currentTime;
                });
            }

            return res.status(200).json({ availableSlots });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    async fetchUpcoming() {
        // retrieve any appointment that should occur after 30 min 
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
        let currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes to the current time
        currentTime.setSeconds(0); //set seconds to 0
        currentTime = currentTime.toLocaleString('en-GB', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
        const upcomingAppointments = await Appointment.findAll({
            where: {
                date: {
                    [Op.eq]: currentDate.toLocaleDateString(),
                },
                time: {
                    [Op.eq]: currentTime,
                },
            },
        });
        console.log("upcoming appointments: ", upcomingAppointments)
        console.log('Appointment check complete at:', new Date());

        //logic for pushing reminders for associated users 
    }
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
