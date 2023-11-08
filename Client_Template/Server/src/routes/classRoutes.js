const express = require('express');
const ClassController = require('../controllers/ClassController');

const router = express.Router();

// Get all users
router.get('/', ClassController.getAllClasses);

module.exports = router;