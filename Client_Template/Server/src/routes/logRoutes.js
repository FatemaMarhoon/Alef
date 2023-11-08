const express = require('express');
const LogController = require('../controllers/LogController');

const router = express.Router();

// Get all users
router.get('/', LogController.getAllLogs);

module.exports = router;