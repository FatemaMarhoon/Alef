const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

// Get all users
router.get('/', UsersController.getAllUsers);

// Get user by email
router.get('/:email', UsersController.getUserByEmail);

// Create a new user
router.post('/', UsersController.createUser);

// login
router.post('/login', UsersController.login);

// // Update user
// router.put('/:email', UsersController.updateUser);

// // Delete user
// router.delete('/:email', UsersController.deleteUser);

module.exports = router;
