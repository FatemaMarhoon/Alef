const express = require('express');
const ClassController = require('../controllers/ClassController');
const { checkStaff, checkTeacher, checkToken } = require('../config/token_validation');

const router = express.Router();

// Get all classes for a specific preschool
router.get('/preschool/:preschoolId',checkToken, ClassController.getAllClasses);

// Get all classes for a specific staff
router.get('/staff/:staffId',checkToken, ClassController.getClassesByStaffId);

// Create a new class
router.post('/',checkStaff, ClassController.createClass);

// Update a class by ID
router.put('/:id',checkStaff, ClassController.updateClass);

// Delete a class by ID
router.delete('/:id',checkStaff, ClassController.deleteClass);

// Get a class by ID
router.get('/:id',checkToken, ClassController.getClassById);

// Get the sum of class capacities for a specific grade
router.get('/preschool/:preschoolId/sum/:grade',checkStaff, ClassController.getSumOfClassCapacitiesByGrade);



module.exports = router;
