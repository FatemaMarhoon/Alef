const express = require('express');
const RequestController = require('../controllers/RequestController');

const router = express.Router();

// Get all users
router.get('/', RequestController.getAllRequests);

module.exports = router;