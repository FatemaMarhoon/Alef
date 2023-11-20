const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();

// Get all students
// router.get('/', StudentController.getAllStudents);
router.get('/preschool/:preschoolId', StudentController.getAllStudents);

// Get student by student_id
router.get('/:student_id', StudentController.getStudentById);

// Create a new student
router.post('/', StudentController.createStudent);

// Update student
router.put('/:student_id', StudentController.updateStudent);

// Delete student
router.delete('/:student_id', StudentController.deleteStudent);
// Get students by preschool
router.get('/preschool/:preschool_id', StudentController.getStudentsByPreschool);

// Get students by class
router.get('/:preschoolId/:classId', StudentController.getStudentsByClassId);


module.exports = router;
