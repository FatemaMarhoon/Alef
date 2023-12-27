const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');

const router = express.Router();

// Get all attendance records
router.get('/', AttendanceController.getAllAttendances);
// Get all attendance records by class id 
router.get('/class/:classId', AttendanceController.getAttendancesByClassId);

//get attendance by student id
router.get('/:studentId', AttendanceController.getAttendanceByStudentId);

//get status by student id
router.get('/status/:studentId', AttendanceController.getAttendanceStatusCountByStudentId);

// Face Detection 
router.get('/faceDetection', AttendanceController.detectFace);

// Create a new attendance record
router.post('/', AttendanceController.createAttendance);

// Update an existing attendance record
router.put('/:id', AttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id', AttendanceController.deleteAttendance);

module.exports = router;
