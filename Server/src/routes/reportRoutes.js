const express = require('express');
const ReportController = require('../controllers/ReportController');

const router = express.Router();

// Get all users
router.get('/', ReportController.getAllReports);

module.exports = router;