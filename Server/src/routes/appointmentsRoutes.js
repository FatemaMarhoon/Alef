const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');

const router = express.Router();

// Get all users
router.get('/', AppointmentController.getAllAppointments);

module.exports = router;