const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const { checkStaff, checkToken } = require('../config/token_validation');

const router = express.Router();

// Get all appointments
router.get('/',checkStaff, AppointmentController.getAllAppointments);

// Create a new appointment 
router.post('/',checkToken, AppointmentController.createAppointment);

//Available Slots  
router.get('/availableSlots',checkToken, AppointmentController.availableSlots);

// Get an appointment by ID
router.get('/:id',checkToken, AppointmentController.getAppointmentById);

// Update an appointment by ID
router.put('/:id',checkToken, AppointmentController.updateAppointment);

// Delete an appointment by ID
router.delete('/:id',checkToken, AppointmentController.deleteAppointment);



module.exports = router;
