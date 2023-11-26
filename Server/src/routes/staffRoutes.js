const express = require('express');
const StaffController = require('../controllers/StaffController');

const router = express.Router();

// Create a new staff member
router.post('/', StaffController.createStaff);

// Get all staff members
router.get('/preschool/:preschoolId', StaffController.getAllStaff);

// Get a staff member by ID
router.get('/:staff_id', StaffController.getStaffById);

// Update a staff member
router.put('/:staff_id', StaffController.updateStaff);

// Delete a staff member
router.delete('/:staff_id', StaffController.deleteStaff);


// Get all staff members uniquely
router.get('/preschoolC/:preschoolId', StaffController.getAllStaffC);

module.exports = router;
