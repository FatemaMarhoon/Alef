const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');

const router = express.Router();

// Get all appointments
router.get('/', AppointmentController.getAllAppointments);

// Create a new appointment
router.post('/', AppointmentController.createAppointment);

//Available Slots 
router.get('/availableSlots', AppointmentController.availableSlots);

router.get('/fetchUpcoming', AppointmentController.fetchUpcoming);

// Get an appointment by ID
router.get('/:id', AppointmentController.getAppointmentById);

// Update an appointment by ID
router.put('/:id', AppointmentController.updateAppointment);

// Delete an appointment by ID
router.delete('/:id', AppointmentController.deleteAppointment);



module.exports = router;
