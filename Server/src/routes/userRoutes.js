const express = require('express');
const UsersController = require('../controllers/UsersController');
const { checkAdmin, checkToken, checkBothAdmins, checkSuperAdmin } = require('../config/token_validation');
const router = express.Router();

// Get all users
router.get('/', checkBothAdmins, UsersController.getAllUsers);

router.get('/super', checkSuperAdmin, UsersController.getSuperAllUsers);

// Get user by id
router.get('/:id', checkToken, UsersController.getUserById);

// Create a new user
router.post('/', checkBothAdmins, UsersController.createUser);

// parent register 
router.post('/register', UsersController.createUser);

// Update user
router.put('/:id', checkBothAdmins, UsersController.updateUser);

//delete user 
router.delete('/:id', checkBothAdmins, UsersController.deleteUser)

module.exports = router;
