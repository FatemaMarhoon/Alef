const express = require('express');
const ClassController = require('../controllers/ClassController');

const router = express.Router();


// // Get all classes
// router.get('/', ClassController.getAllClasses);
// Get all classes for a specific preschool
router.get('/preschool/:preschoolId', ClassController.getAllClasses);

// Create a new class
router.post('/', ClassController.createClass);

// Update a class by ID
router.put('/:id', ClassController.updateClass);

// Delete a class by ID
router.delete('/:id', ClassController.deleteClass);

// Delete a class by ID
router.get('/:id', ClassController.getClassById);

// Get the sum of class capacities for a specific grade
router.get('/preschool/:preschoolId/sum/:grade', ClassController.getSumOfClassCapacitiesByGrade);

// check supervisor
// Import the checkSupervisorAvailability function
// const { checkSupervisorAvailability } = require('../controllers/ClassController');

// router.get('/check/:supervisor', checkSupervisorAvailability);

module.exports = router;
