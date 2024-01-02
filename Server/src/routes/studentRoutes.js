const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();
const multer = require('multer');
const { checkToken, checkStaff } = require('../config/token_validation');

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
}).fields([
    { name: 'personal_picture', maxCount: 1 },
    { name: 'certificate_of_birth', maxCount: 1 },
    { name: 'passport', maxCount: 1 },
]);

// Get all students
router.get('/preschool/:preschoolId', checkStaff, StudentController.getAllStudents);

// Get student by student_id
router.get('/:student_id', checkToken, StudentController.getStudentById);

// Create a new student
router.post('/', checkStaff, multerMiddleware, StudentController.createStudent);

// Update student
router.put('/:student_id', checkStaff, multerMiddleware, StudentController.updateStudent);
//Update student class id
router.put('/class/:student_id', checkStaff, StudentController.updateStudentClassId);

// Delete student
router.delete('/:student_id', checkStaff, StudentController.deleteStudent);

// Get students by preschool
router.get('/preschool/:preschool_id', checkStaff, StudentController.getStudentsByPreschool);

// Get students by class
router.get('/:preschoolId/:classId', checkToken, StudentController.getStudentsByClassId);

// Get all students or students by grade if grade is provided
router.get('/preschool/:preschoolId/grade/:grade?', checkToken, StudentController.getAllStudents);

// Get all students or students by classid if classid is provided
router.get('/preschool/:preschoolId/class/:class_id?', checkToken, StudentController.getAllStudents);

// Get all students by user id (query parameter)
router.get('/', checkToken, StudentController.getAllStudentsByUserId);

module.exports = router;
