const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

// Get all users
router.get('/', NotificationController.getAllNotifications);

module.exports = router;