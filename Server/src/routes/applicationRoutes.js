const express = require('express');
const multer = require('multer');
const ApplicationController = require('../controllers/ApplicationController');
const router = express.Router();

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
  }).fields([
    { name: 'personal_picture', maxCount: 1 },
    { name: 'certificate_of_birth', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
  ]);

// const multerMiddleware = multer({
//     storage: multer.memoryStorage(),
// }).single('personal_picture');

// Get all applications
router.get('/', ApplicationController.getAllApplications);

// Get a single application by ID
router.get('/:id', ApplicationController.getApplicationById);

// Create a new application
router.post('/',multerMiddleware, ApplicationController.createApplication);

// Update an application by ID
router.put('/:id', ApplicationController.updateApplication);

// Delete an application by ID
router.delete('/:id', ApplicationController.deleteApplication);


module.exports = router;
