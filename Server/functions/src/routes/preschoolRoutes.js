const express = require('express');
const PreschoolController = require('../controllers/PreschoolController');
const { checkAdmin, checkSuperAdmin, checkToken } = require('../config/token_validation');

const router = express.Router();
const multer = require('multer');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
}).fields([
  { name: 'logoFile', maxCount: 1 },
]);

// Get all users
router.get('/', checkSuperAdmin, PreschoolController.getAllPreschools);

// Create a new preschool
router.post('/', PreschoolController.createPreschool);

//Get a preschool by ID
router.get('/:id', PreschoolController.getPreschoolById);

// Update preschool address 
router.put('/address/:id', PreschoolController.updatePreschoolAddress);

// Update a preschool by ID
router.put('/:id', multerMiddleware, PreschoolController.updatePreschool);

// Delete a preschool by ID
router.delete('/:id', PreschoolController.deletePreschool);



//router.post('/approve-request', PreschoolController.createPreschoolAfterApproval);

module.exports = router;