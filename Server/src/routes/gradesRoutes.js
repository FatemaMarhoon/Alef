const express = require('express');
const GradesController = require('../controllers/GradeCapacityController');
const router = express.Router();

//Get grades (pass preschool id as query parameter)
router.get('/', GradesController.getAllGradesCapacities);

module.exports = router;