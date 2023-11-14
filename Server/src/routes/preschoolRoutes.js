const express = require('express');
const PreschoolController = require('../controllers/PreschoolController');
const router = express.Router();

// Get all users
router.get('/', PreschoolController.getAllPreschools);

// Create a new preschool
router.post('/', PreschoolController.createPreschool);

//Get a preschool by ID
router.get('/:id', PreschoolController.getPreschoolById);

// Update a preschool by ID
router.put('/:id', PreschoolController.updatePreschool);

// Delete a preschool by ID
router.delete('/:id', PreschoolController.deletePreschool);

//router.post('/approve-request', PreschoolController.createPreschoolAfterApproval);

module.exports = router;