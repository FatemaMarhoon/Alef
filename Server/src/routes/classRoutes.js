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

//get by class id
// Delete a class by ID
router.get('/:id', ClassController.getClassById);

module.exports = router;
