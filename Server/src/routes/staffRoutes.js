const express = require('express');
const StaffController = require('../controllers/StaffController');
const { checkStaff, checkToken } = require('../config/token_validation');

const router = express.Router();

// Create a new staff member
router.post('/',checkStaff, StaffController.createStaff);

// Get all staff members
router.get('/preschool/:preschoolId',checkStaff, StaffController.getAllStaff);

// Get a staff member by user id 
router.get('/user/:id',checkToken, StaffController.getStaffByUserId);

// Get a staff member by ID
router.get('/:staff_id',checkToken, StaffController.getStaffById);

// Update a staff member
router.put('/:staff_id',checkToken, StaffController.updateStaff);

// Delete a staff member
router.delete('/:staff_id',checkStaff, StaffController.deleteStaff);

// Get all staff members uniquely
router.get('/preschoolC/:preschoolId',checkToken, StaffController.getAllStaffC);


module.exports = router;
