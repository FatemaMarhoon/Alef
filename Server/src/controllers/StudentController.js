const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/student')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');

const LogsController = require('./LogController');
const UsersController = require('./UsersController');
const { verifyPreschool } = require('../config/token_validation');


Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });

const validateStudentData = (studentData) => {
    const requiredFields = ['student_name', 'DOB', 'CPR', 'contact_number1', 'contact_number2', 'guardian_name', 'enrollment_date', 'medical_history', 'gender'];

    for (const field of requiredFields) {
        if (!studentData[field]) {
            return { isValid: false, message: `${field.replace('_', ' ')} is required` };
        }
    }
    // Validate DOB
    const dobYear = new Date(studentData.DOB).getFullYear();
    const dob = new Date(studentData.DOB);

    if (isNaN(dob.getTime()) || dob > new Date()) {
        return { isValid: false, message: 'DOB must be a valid date and should not be in the future' };
    }

    if (studentData.enrollment_date > new Date()) {
        return { isValid: false, message: 'Enrollment date must be a valid date and should not be in the future' };
    }
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
            // access control 
            if (await verifyPreschool(preschoolId, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

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

            // access control 
            if (await verifyPreschool(student.preschool_id, req) == false && await UsersController.getCurrentUser(req) != student.user_id) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

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

        // access control 
        if (await verifyPreschool(preschool_id, req) == false) {
            return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
        }


        const validation = validateStudentData(studentData);
        const user_id = await UsersController.getCurrentUser(req, res);
        // Check if the CPR already exists
        const existingCPRUser = await Student.findOne({ where: { CPR: studentData.CPR } });
        if (existingCPRUser) {
            return res.status(400).json({ message: 'CPR already exists' });
        }
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
        const { student_name, DOB, CPR, grade, class_id, contact_number1, contact_number2, guardian_name, enrollment_date, medical_history, gender, certificate_of_birth, passport, personal_picture } = req.body;
        const updatedStudentData = { student_name, DOB, grade, class_id, CPR, contact_number1, contact_number2, guardian_name, enrollment_date, medical_history, gender, certificate_of_birth, passport, personal_picture };
        console.log('Req Body:', req.body);
        console.log('Req Files:', req.files);

        // Add validation logic here
        const validation = validateStudentData(updatedStudentData);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                // access control 
                if (await verifyPreschool(student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
                const originalValues = JSON.stringify(student.toJSON()); // Store the original values before the update
                // student.set(updatedStudentData);

                // Check and update each property individually
                if (student_name) student.student_name = student_name;
                if (DOB) student.DOB = DOB;
                if (CPR) student.CPR = CPR;
                if (grade) student.grade = grade;
                if (class_id) student.class_id = class_id;
                if (contact_number1) student.contact_number1 = contact_number1;
                if (contact_number2) student.contact_number2 = contact_number2;
                if (guardian_name) student.guardian_name = guardian_name;
                if (enrollment_date) student.enrollment_date = enrollment_date;
                if (gender) student.gender = gender;
                if (medical_history) student.medical_history = medical_history;

                //check for updating files 
                if (req.files) {
                    if (req.files['personal_picture']) {
                        const picture_url = await FilesManager.upload(req.files['personal_picture'][0]);
                        student.personal_picture = picture_url;
                    }
                    if (req.files['certificate_of_birth']) {
                        const certificate_of_birth_url = await FilesManager.upload(req.files['certificate_of_birth'][0]);
                        student.certificate_of_birth = certificate_of_birth_url;
                    }
                    if (req.files['passport']) {
                        const passport_url = await FilesManager.upload(req.files['passport'][0]);
                        student.passport = passport_url;
                    }
                }

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
    async updateStudentClassId(req, res) {
        const { student_id } = req.params;
        const { class_id } = req.body; // Only class_id is required for this update
        console.log('Req Body:', req.body);
        console.log('Req Files:', req.files);

        // Add validation logic here if needed

        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                const originalClassId = student.class_id; // Store the original class_id before the update

                // Update only the class_id property
                if (class_id !== undefined) {
                    student.class_id = class_id;
                    await student.save();
                }

                // Create a log entry for the student class_id update
                await LogsController.createLog({
                    type: 'Student Class Update',
                    original_values: JSON.stringify({ class_id: originalClassId }),
                    current_values: JSON.stringify({ class_id: student.class_id }),
                    user_id: user_id
                });

                res.json({ message: 'Student class_id updated successfully', student });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify({ class_id }),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });
        }
    }
    ,
    async deleteStudent(req, res) {
        const { student_id } = req.params;
        let deletedStudentData; // Declare the variable outside the block
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                // access control 
                if (await verifyPreschool(student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }

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
            // access control 
            if (await verifyPreschool(preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }
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
            // access control 
            if (await verifyPreschool(preschoolId, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }
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
            

                const students = await Student.findAll({ where: { user_id: user_id }, include: Preschool });
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
