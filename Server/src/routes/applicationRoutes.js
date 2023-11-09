const express = require('express');
const ApplicationController = require('../controllers/ApplicationController');

const router = express.Router();

// Get all applications
router.get('/', ApplicationController.getAllApplications);

// Get a single application by ID
router.get('/:id', ApplicationController.getApplicationById);

// Create a new application
router.post('/', ApplicationController.createApplication);

// Update an application by ID
router.put('/:id', ApplicationController.updateApplication);

// Delete an application by ID
router.delete('/:id', ApplicationController.deleteApplication);

module.exports = router;
