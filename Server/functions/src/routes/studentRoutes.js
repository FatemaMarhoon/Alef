const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();
const multer = require('multer');

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
}).fields([
    { name: 'personal_picture', maxCount: 1 },
    { name: 'certificate_of_birth', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
]);

// Get all students
router.get('/preschool/:preschoolId', StudentController.getAllStudents);

// Get student by student_id
router.get('/:student_id', StudentController.getStudentById);

// Create a new student
router.post('/', multerMiddleware, StudentController.createStudent);

// Update student
router.put('/:student_id', StudentController.updateStudent);

// Delete student
router.delete('/:student_id', StudentController.deleteStudent);
// Get students by preschool
router.get('/preschool/:preschool_id', StudentController.getStudentsByPreschool);

// Get students by class
router.get('/:preschoolId/:classId', StudentController.getStudentsByClassId);

// Get all students or students by grade if grade is provided
router.get('/preschool/:preschoolId/grade/:grade?', StudentController.getAllStudents);

// Get all students or students by classid if classid is provided
router.get('/preschool/:preschoolId/class/:class_id?', StudentController.getAllStudents);

// Get all students by user id (query parameter)
router.get('/', StudentController.getAllStudentsByUserId);

module.exports = router;
