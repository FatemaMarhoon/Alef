const express = require('express');
const multer = require('multer');
const ApplicationController = require('../controllers/ApplicationController');
const { checkStaff, checkToken } = require('../config/token_validation');
const router = express.Router();

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
  }).fields([
    { name: 'personal_picture', maxCount: 1 },
    { name: 'certificate_of_birth', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
  ]);

// Get all applications
router.get('/', checkStaff, ApplicationController.getAllApplications);

// Get a single application by ID
router.get('/:id',checkToken, ApplicationController.getApplicationById);

// Create a new application
router.post('/', multerMiddleware, ApplicationController.createApplication); 

// withdraw application by parent 
router.put('/withdraw/:id',checkToken, ApplicationController.withdrawApplication);

// Update an application by ID
router.put('/:id', checkStaff, multerMiddleware, ApplicationController.updateApplication);


// Delete an application by ID
router.delete('/:id',checkStaff, ApplicationController.deleteApplication);


module.exports = router;
