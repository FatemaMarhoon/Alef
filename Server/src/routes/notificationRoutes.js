const express = require('express');
const NotificationController = require('../controllers/NotificationController');
const { checkToken } = require('../config/token_validation');

const router = express.Router();

// Get all users
router.get('/', checkToken, NotificationController.getAllNotifications);

// Update all notifications by user ID
router.put('/:id', checkToken, NotificationController.markAllRead);

// set registry token for mobile users 
router.post('/setToken', checkToken, NotificationController.setRegistrationToken);

module.exports = router;