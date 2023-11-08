const express = require('express');
const ApplicationController = require('../controllers/ApplicationController');

const router = express.Router();

// Get all users
router.get('/', ApplicationController.getAllApplications);

module.exports = router;