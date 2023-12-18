const express = require('express');
const StudentEvaluationController = require('../controllers/StudentEvaluationController');

const router = express.Router();

// Get all student evaluations
router.get('/', StudentEvaluationController.getAllStudentEvaluations);

router.get('/:id', StudentEvaluationController.getEvaluationById);

// Create a new student evaluation
router.post('/', StudentEvaluationController.createStudentEvaluation);

// Update a student evaluation by ID
router.put('/:id', StudentEvaluationController.updateStudentEvaluation);

// Delete a student evaluation by ID
router.delete('/:id', StudentEvaluationController.deleteStudentEvaluation);

module.exports = router;
