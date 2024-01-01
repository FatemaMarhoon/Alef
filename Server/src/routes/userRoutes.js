const express = require('express');
const UsersController = require('../controllers/UsersController');
const { checkAdmin, checkToken } = require('../config/token_validation');
const router = express.Router();

// Get all users
router.get('/', checkAdmin, UsersController.getAllUsers);
router.get('/firebaseAll', UsersController.updateAll)
// Get user by id
router.get('/:id', checkToken, UsersController.getUserById);

// Create a new user
router.post('/',checkAdmin, UsersController.createUser);

// parent register 
router.post('/register', UsersController.createUser);

// Update user
router.put('/:id', checkAdmin, UsersController.updateUser);

//delete user 
router.delete('/:id',checkAdmin, UsersController.deleteUser)

module.exports = router;
