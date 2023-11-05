const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');

const router = express.Router();

// Get all users
router.get('/', AttendanceController.getAllAttendances);

module.exports = router;