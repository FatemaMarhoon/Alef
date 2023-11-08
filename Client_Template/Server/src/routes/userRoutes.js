const express = require('express');
const UsersController = require('../controllers/UsersController');
const { checkToken } = require('../config/token_validation');
const router = express.Router();

// Get all users
router.get('/',checkToken, UsersController.getAllUsers);

// Get user by email
router.get('/:email',checkToken, UsersController.getUserByEmail);

// Create a new user
router.post('/',checkToken, UsersController.createUser);

// login
router.post('/login', UsersController.login);

// parent register 
router.post('/register', UsersController.register);

// // Update user
// router.put('/:email', UsersController.updateUser);

// // Delete user
// router.delete('/:email', UsersController.deleteUser);

module.exports = router;