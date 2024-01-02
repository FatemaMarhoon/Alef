const express = require('express');
const ApplicationEvaluationController = require('../controllers/ApplicationEvaluationController');
const { checkStaff } = require('../config/token_validation');

const router = express.Router();

// Get a single evaluation by ID
router.get('/:id', checkStaff, ApplicationEvaluationController.getEvaluationById); 

// Create a new evaluation
router.post('/',checkStaff, ApplicationEvaluationController.createEvaluation); 

// Update an evaluation by ID
router.put('/:id',checkStaff, ApplicationEvaluationController.updateEvaluation);

// Delete an evaluation by ID
router.delete('/:id',checkStaff, ApplicationEvaluationController.deleteEvaluation);

module.exports = router;
