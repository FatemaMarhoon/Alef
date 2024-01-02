const express = require('express');
const GradesController = require('../controllers/GradeCapacityController');
const { checkAdmin, checkStaff, checkBothAdmins, checkToken } = require('../config/token_validation');
const router = express.Router();

//Get grades (pass preschool id as query parameter)
router.get('/',checkToken, GradesController.getAllGradesCapacities);

// Get grade capacity by preschool ID and grade ID
router.get('/:preschoolId/:gradeId',checkToken, GradesController.getGradeCapacityById);

router.put('/',checkBothAdmins, GradesController.updateGradeCapacities);

module.exports = router;