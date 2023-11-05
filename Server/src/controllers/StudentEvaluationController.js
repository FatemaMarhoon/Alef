const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/Student')(sequelize, DataTypes);
const StudentEvaluation = require('../models/student_evaluation')(sequelize, DataTypes);

StudentEvaluation.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(StudentEvaluation, { foreignKey: 'student_id' });

const StudentEvaluationController = {
    async getAllStudentEvaluations(req, res) {
        try {
            const studentEvaluations = await StudentEvaluation.findAll({
                include: Student,
            });
            res.json(studentEvaluations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StudentEvaluationController;
