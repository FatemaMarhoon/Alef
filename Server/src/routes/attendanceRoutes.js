const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const { checkToken } = require('../config/token_validation');

const router = express.Router();

// Get all attendance records
router.get('/',checkToken, AttendanceController.getAllAttendances);

// Get all attendance records by class id 
router.get('/class/:classId',checkToken, AttendanceController.getAttendancesByClassId);

//get attendance by student id
router.get('/:studentId',checkToken, AttendanceController.getAttendanceByStudentId);

//get status by student id
router.get('/status/:studentId',checkToken, AttendanceController.getAttendanceStatusCountByStudentId);

// Face Detection 
router.get('/faceDetection', AttendanceController.detectFace);

// Create a new attendance record
router.post('/', AttendanceController.createAttendance);

// Update an existing attendance record
router.put('/:id',checkToken, AttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id',checkToken, AttendanceController.deleteAttendance);

module.exports = router;
