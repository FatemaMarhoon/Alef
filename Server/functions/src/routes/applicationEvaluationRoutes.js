const express = require('express');
const ApplicationEvaluationController = require('../controllers/ApplicationEvaluationController');

const router = express.Router();

// Get all evaluations
router.get('/', ApplicationEvaluationController.getAllEvaluations);

// Get a single evaluation by ID
router.get('/:id', ApplicationEvaluationController.getEvaluationById);

// Create a new evaluation
router.post('/', ApplicationEvaluationController.createEvaluation);

// Update an evaluation by ID
router.put('/:id', ApplicationEvaluationController.updateEvaluation);

// Delete an evaluation by ID
router.delete('/:id', ApplicationEvaluationController.deleteEvaluation);

module.exports = router;
