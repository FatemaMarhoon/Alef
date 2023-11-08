const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');


const Student = require('../models/Student')(sequelize, DataTypes);
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
            const students = await Student.findAll(
                {
                    include: Preschool
                }
            );
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStudentById(req, res) {
        const { student_id } = req.params;
        try {
            const student = await Student.findByStudentId(student_id);
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
            const studentId = await Student.create(studentData);
            res.json({ message: 'Student created successfully', studentId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStudent(req, res) {
        const { student_id } = req.params;
        const updatedStudent = req.body;
        try {
            const success = await Student.update(student_id, updatedStudent);
            if (success) {
                res.json({ message: 'Student updated successfully' });
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
            const success = await Student.delete(student_id);
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
            const students = await Student.findByPreschoolId(preschool_id);
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getStudentsByClass(req, res) {
        const { class_name } = req.params;
        try {
            const students = await Student.findByClassName(class_name);
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

};

module.exports = StudentController;
