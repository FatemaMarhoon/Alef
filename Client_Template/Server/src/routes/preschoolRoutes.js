const express = require('express');
const PreschoolController = require('../controllers/PreschoolController');
const GradesController = require('../controllers/GradeCapacityController');
const router = express.Router();

// Get all users
router.get('/', PreschoolController.getAllPreschools);
router.get('/grades', GradesController.getAllGrades);


module.exports = router;