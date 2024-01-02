const express = require('express');
const StudentEvaluationController = require('../controllers/StudentEvaluationController');
const { checkToken } = require('../config/token_validation');

const router = express.Router();

// Get all student evaluations
router.get('/',checkToken, StudentEvaluationController.getAllStudentEvaluations);

router.get('/:id',checkToken, StudentEvaluationController.getEvaluationById);

//get evaluation report
router.get('/report/:id',checkToken, StudentEvaluationController.getEvaluationReposrtById);

// Create a new student evaluation
router.post('/',checkToken, StudentEvaluationController.createStudentEvaluation);

// Update a student evaluation by ID
router.put('/:id',checkToken, StudentEvaluationController.updateStudentEvaluation);

// Delete a student evaluation by ID
router.delete('/:id',checkToken, StudentEvaluationController.deleteStudentEvaluation);

module.exports = router;
