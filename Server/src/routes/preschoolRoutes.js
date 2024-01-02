const express = require('express');
const PreschoolController = require('../controllers/PreschoolController');
const { checkAdmin, checkSuperAdmin, checkToken, checkBothAdmins } = require('../config/token_validation');

const router = express.Router();
const multer = require('multer');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
}).fields([
  { name: 'logoFile', maxCount: 1 },
]);

// Get all preschools 
router.get('/', PreschoolController.getAllPreschools);

// Create a new preschool
router.post('/', checkSuperAdmin, PreschoolController.createPreschool);

//Get a preschool by ID
router.get('/:id', PreschoolController.getPreschoolById);

// Update preschool address 
router.put('/address/:id',checkBothAdmins, PreschoolController.updatePreschoolAddress); //super admin & preschool admin 

// Update a preschool by ID
router.put('/:id',checkBothAdmins, multerMiddleware, PreschoolController.updatePreschool); //super admin & preschool admin 

// Delete a preschool by ID
router.delete('/:id',checkSuperAdmin, PreschoolController.deletePreschool);



//router.post('/approve-request', PreschoolController.createPreschoolAfterApproval);

module.exports = router;