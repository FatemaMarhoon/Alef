const express = require('express');
const multer = require('multer');

const AttendanceController = require('../controllers/AttendanceController');

const router = express.Router();

// Set up multer to handle form data
const multerMiddleware = multer({

    storage: multer.memoryStorage(),

    dest: '/Users/iFatema/Desktop/Deployed/Alef/Server/functions/src/pythonScript/images',
}).single('file');

// Multer Configuration
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });


// File Upload Endpoint
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Get all attendance records
router.get('/', AttendanceController.getAllAttendances);

// Face Detection 
router.post('/faceDetection', multerMiddleware, AttendanceController.detectFace);


// Create a new attendance record
router.post('/', AttendanceController.createAttendance);

// Update an existing attendance record
router.put('/:id', AttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id', AttendanceController.deleteAttendance);

module.exports = router;
