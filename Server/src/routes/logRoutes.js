const express = require('express');
const LogController = require('../controllers/LogController');

const router = express.Router();

// Get all logs
router.get('/', LogController.getAllLogs);

// Create a new log
router.post('/', LogController.createLog);



module.exports = router;
