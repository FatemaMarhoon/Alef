const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/student')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');

const LogsController = require('./LogController');
const UsersController = require('./UsersController');


Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });

const validateStudentData = (studentData) => {
    const requiredFields = ['student_name', 'DOB', 'CPR', 'contact_number1', 'contact_number2', 'guardian_name', 'enrollment_date', 'medical_history', 'preschool_id', 'gender'];

    for (const field of requiredFields) {
        if (!studentData[field]) {
            return { isValid: false, message: `${field.replace('_', ' ')} is required` };
        }
    }
    // Validate DOB
    const currentYear = new Date().getFullYear();
    const dobYear = new Date(studentData.DOB).getFullYear();

    // if (dobYear > currentYear) {
    //     return { isValid: false, message: 'DOB must be before the current year' };
    // }
    if (dobYear < 2018 || dobYear > 2023) {
        return { isValid: false, message: 'DOB must be between 2018 and 2023' };
    }
    // Validate CPR length
    if (String(studentData.CPR).length !== 9) {
        return { isValid: false, message: 'CPR must be 9 numbers in length' };
    }

    // Validate contact numbers length
    if (String(studentData.contact_number1).length !== 8 || String(studentData.contact_number2).length !== 8) {
        return { isValid: false, message: 'Contact numbers must be 8 numbers in length' };
    }

    return { isValid: true };
};




const StudentController = {


    async getAllStudents(req, res) {
        try {
            const { preschoolId, grade, class_id } = req.params;

            const whereClause = { preschool_id: preschoolId };

            if (grade) {
                whereClause.grade = grade;
            }

            else if (class_id) {
                whereClause.class_id = class_id;
            }

            const students = await Student.findAll({
                where: whereClause,
                include: Preschool,
            });

            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    async getStudentById(req, res) {
        const { student_id } = req.params;
        try {
            const student = await Student.findByPk(student_id);
            //generate and set urls for files 
            student.personal_picture = await FilesManager.generateSignedUrl(student.personal_picture);
            student.passport = await FilesManager.generateSignedUrl(student.passport);
            student.certificate_of_birth = await FilesManager.generateSignedUrl(student.certificate_of_birth);
            if (student) {
                res.json(student);
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createStudent(req, res) {
        const { student_name, DOB, CPR, grade, contact_number1, contact_number2, guardian_name, enrollment_date, medical_history, preschool_id, gender, certificate_of_birth, passport, personal_picture } = req.body;
        const studentData = { student_name, DOB, grade, CPR, contact_number1, contact_number2, guardian_name, enrollment_date, medical_history, preschool_id, gender, certificate_of_birth, passport, personal_picture };
        console.log('Req Body:', req.body);
        console.log('Req Files:', req.files);
        const validation = validateStudentData(studentData);
        const user_id = await UsersController.getCurrentUser(req, res);

        if (!validation.isValid) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(studentData),
                current_values: JSON.stringify({ error: validation.message }),
                user_id: user_id
                //user_id: 28
            });
            return res.status(400).json({ message: validation.message });
        }

        try {
            //upload files
            const personal_picture = req.files['personal_picture'][0];
            const picture_url = await FilesManager.upload(personal_picture);
            studentData.personal_picture = picture_url;

            const certificate_of_birth = req.files['certificate_of_birth'][0];
            const certificate_url = await FilesManager.upload(certificate_of_birth);
            studentData.certificate_of_birth = certificate_url;

            const passport = req.files['passport'][0];
            const passport_url = await FilesManager.upload(passport);
            studentData.passport = passport_url;

            console.log("personaaal:", studentData.personal_picture);
            console.log("certificate:", studentData.certificate_of_birth);
            console.log("passport:", studentData.passport);



            //create log
            await LogsController.createLog({
                type: 'Student Creation',
                original_values: JSON.stringify(studentData),
                current_values: JSON.stringify(studentData),
                user_id: user_id
                //  user_id: 28
            });


            const student = await Student.create(studentData);
            res.json({ message: 'Student created successfully', student });
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(studentData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });

        }
    },

    async updateStudent(req, res) {
        const { student_id } = req.params;
        const updatedStudentData = req.body;
        // // Add validation logic here
        // const validation = validateStudentData(updatedStudentData);
        // if (!validation.isValid) {
        //     return res.status(400).json({ message: validation.message });
        // }
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                const originalValues = JSON.stringify(student.toJSON()); // Store the original values before the update

                student.set(updatedStudentData);
                await student.save();

                const newValues = JSON.stringify(student.toJSON()); // Store the updated values after the update

                // Create a log entry for the student update
                await LogsController.createLog({
                    type: 'Student Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });

                res.json({ message: 'Student updated successfully', student });
            } else {
                res.status(404).json({ message: 'Student not found or no changes made' });
            }
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStudentData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStudent(req, res) {
        const { student_id } = req.params;
        let deletedStudentData; // Declare the variable outside the block

        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                deletedStudentData = JSON.stringify(student.toJSON()); // Store the student data before deletion

                const success = await Student.destroy({ where: { id: student_id } });

                if (success) {
                    // Create a log entry for the student deletion
                    await LogsController.createLog({
                        type: 'Student Deletion',
                        original_values: deletedStudentData,
                        current_values: 'Student deleted',
                        user_id: user_id
                    });

                    res.json({ message: 'Student deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Student not found' });
                }
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (error) {
            if (deletedStudentData) {
                // Create a log entry for the error if deletedStudentData is defined
                await LogsController.createLog({
                    type: 'Error',
                    original_values: deletedStudentData,
                    current_values: JSON.stringify({ error: error.message }),
                    user_id: user_id
                });
            } else {
                // Handle the error if deletedStudentData is not defined
                console.error('Error deleting student:', error);
            }

            res.status(500).json({ message: error.message });
        }
    },


    async getStudentsByPreschool(req, res) {
        const { preschool_id } = req.params;
        try {
            const students = await Student.findAll({ where: { preschool_id } });
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    async getStudentsByClassId(req, res) {
        try {
            const { preschoolId } = req.params;
            const { classId } = req.params;
            const students = await Student.findAll({
                where: { preschool_id: preschoolId, class_id: classId },

                include: Preschool


            });
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllStudentsByUserId(req, res) {
        const user_id = req.query.user_id;
        try {
            if (user_id) {
                const students = await Student.findAll({ where: { user_id: user_id } });
                if (students) {
                    res.status(200).json(students);
                }
                else {
                    res.status(404).json({ message: 'No Students Found.' });
                }
            }
            else {
                res.status(404).json({ message: 'User not found.' });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = StudentController;
