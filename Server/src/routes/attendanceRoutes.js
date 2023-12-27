const express = require('express');
const multer = require('multer');
const AttendanceController = require('../controllers/AttendanceController');

const router = express.Router();

// Set up multer to handle form data
const multerMiddleware = multer({

    storage: multer.memoryStorage(),

    dest: './src/pythonScript/images',
}).single('file');


// Get all attendance records
router.get('/', AttendanceController.getAllAttendances);
// Get all attendance records by class id 
router.get('/class/:classId', AttendanceController.getAttendancesByClassId);

// Face Detection 
router.post('/faceDetection', multerMiddleware, AttendanceController.detectFace);

// Create a new attendance record
router.post('/', AttendanceController.createAttendance);

// Update an existing attendance record
router.put('/:id', AttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id', AttendanceController.deleteAttendance);

module.exports = router;
