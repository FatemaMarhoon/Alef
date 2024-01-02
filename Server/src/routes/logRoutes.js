const express = require('express');
const LogController = require('../controllers/LogController');
const { checkSuperAdmin } = require('../config/token_validation');

const router = express.Router();

// Get all logs
router.get('/',checkSuperAdmin, LogController.getAllLogs);

// Create a new log
router.post('/', LogController.createLog);



module.exports = router;
