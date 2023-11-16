const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/student')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);

Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });

const StudentController = {
    async getAllStudents(req, res) {
        try {
            const { preschoolId } = req.params;

            const students = await Student.findAll({
                where: { preschool_id: preschoolId },

                include: Preschool

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
        const studentData = req.body;
        try {
            const student = await Student.create(studentData);
            res.json({ message: 'Student created successfully', student });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStudent(req, res) {
        const { student_id } = req.params;
        const updatedStudentData = req.body;
        try {
            const student = await Student.findByPk(student_id);

            if (student) {
                student.set(updatedStudentData);
                await student.save();

                res.json({ message: 'Student updated successfully', student });
            } else {
                res.status(404).json({ message: 'Student not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStudent(req, res) {
        const { student_id } = req.params;
        try {
            const success = await Student.destroy({ where: { id: student_id } });
            if (success) {
                res.json({ message: 'Student deleted successfully' });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        } catch (error) {
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

    async getStudentsByClass(req, res) {
        const { class_name } = req.params;
        try {
            const students = await Student.findAll({ where: { class_name } });
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StudentController;
