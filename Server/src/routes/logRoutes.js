const express = require('express');
const LogController = require('../controllers/LogController');

const router = express.Router();

// Get all logs
router.get('/', LogController.getAllLogs);

// Create a new log
router.post('/', LogController.createLog);

// Update an existing log
router.put('/:id', LogController.updateLog);

// Delete a log
router.delete('/:id', LogController.deleteLog);

module.exports = router;
