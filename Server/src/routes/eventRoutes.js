const express = require('express');
const Controller = require('../controllers/EventController');
const EventController = Controller.EventController;
const router = express.Router();

//Get all events
router.get('/', EventController.getAllEvents);

// router.get('/reminder', EventController.eventsReminder);

// Create a new event
router.post('/', EventController.createEvent);

// Get an event by ID
router.get('/:id', EventController.getEventById);

// Update an event by ID
router.put('/:id', EventController.updateEvent);

// Delete an event by ID
router.delete('/:id', EventController.deleteEvent);


module.exports = router;
