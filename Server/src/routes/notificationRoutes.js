const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

// Get all users
router.get('/', NotificationController.getAllNotifications);
// Create a new notification
// router.post('/', NotificationController.createNotification);

// Update a notification by ID
router.put('/:id', NotificationController.markAllRead);

// Delete a notification by ID
router.delete('/:id', NotificationController.deleteNotification);

router.post('/setToken', NotificationController.setRegistrationToken);

module.exports = router;