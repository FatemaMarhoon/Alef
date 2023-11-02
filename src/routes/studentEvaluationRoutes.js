const express = require('express');
const StudentEvaluationController = require('../controllers/StudentEvaluationController');

const router = express.Router();

// Get all users
router.get('/', StudentEvaluationController.getAllStudentEvaluations);

module.exports = router;