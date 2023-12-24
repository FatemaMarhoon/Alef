const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');

const router = express.Router();

// Get all attendance records
router.get('/', AttendanceController.getAllAttendances);

// Face Detection 
router.post('/faceDetection', AttendanceController.detectFace);

// Create a new attendance record
router.post('/', AttendanceController.createAttendance);

// Update an existing attendance record
router.put('/:id', AttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id', AttendanceController.deleteAttendance);

module.exports = router;
