const express = require('express');
const UsersController = require('../controllers/UsersController');
const { checkAdmin, checkSuperAdmin, checkToken } = require('../config/token_validation');
const router = express.Router();

// Get all users
router.get('/', checkToken, UsersController.getAllUsers);

// // Get user by email
// router.get('/:email', checkToken, UsersController.getUserByEmail);

// Get user by id
router.get('/:id', checkToken, UsersController.getUserById);

// Create a new user
router.post('/', UsersController.createUser);

// parent register 
router.post('/register', UsersController.createUser);

// Update user
router.put('/:id', UsersController.updateUser);

//delete user 
router.delete('/:id', UsersController.deleteUser)

module.exports = router;
