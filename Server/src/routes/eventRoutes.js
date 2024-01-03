const express = require('express');
const Controller = require('../controllers/EventController');
const { checkToken, checkStaff } = require('../config/token_validation');
const EventController = Controller.EventController;
const router = express.Router();

//Get all events
router.get('/',checkToken, EventController.getAllEvents);// all in preschool (including parents)

// Create a new event
router.post('/',checkToken, EventController.createEvent); // staff, admin, or teacher of passed prescool

// Get an event by ID 
router.get('/:id',checkToken, EventController.getEventById); // all in preschool (including parents)

// Update an event by ID
router.put('/:id',checkToken, EventController.updateEvent); // only staff

// Delete an event by ID
router.delete('/:id', EventController.deleteEvent); 


module.exports = router;
