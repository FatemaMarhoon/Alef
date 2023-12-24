const express = require('express');
const GradesController = require('../controllers/GradeCapacityController');
const router = express.Router();

//Get grades (pass preschool id as query parameter)
router.get('/', GradesController.getAllGradesCapacities);

// Get grade capacity by preschool ID and grade ID
router.get('/:preschoolId/:gradeId', GradesController.getGradeCapacityById);

module.exports = router;