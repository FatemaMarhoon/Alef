const express = require('express');
const StaticValuesController = require('../controllers/StaticValuesController');

const router = express.Router();

// Get all users
router.get('/requestStatuses', StaticValuesController.getAllRequestStatuses);

module.exports = router;