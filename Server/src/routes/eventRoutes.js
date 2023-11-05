const express = require('express');
const EventController = require('../controllers/EventController');

const router = express.Router();

// Get all users
router.get('/', EventController.getAllEvents);

module.exports = router;