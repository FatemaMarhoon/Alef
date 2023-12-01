const express = require('express');
const EventController = require('../controllers/EventController');

const router = express.Router();

//Get all events
router.get('/', EventController.getAllEvents);

// Create a new event
router.post('/', EventController.createEvent);

// Get an event by ID
router.get('/:id', EventController.getEventById);

// Update an event by ID
router.put('/:id', EventController.updateEvent);

// Delete an event by ID
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
