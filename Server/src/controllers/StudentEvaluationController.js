const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Student = require('../models/Student')(sequelize, DataTypes);
const StudentEvaluation = require('../models/student_evaluation')(sequelize, DataTypes);

StudentEvaluation.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(StudentEvaluation, { foreignKey: 'student_id' });

const StudentEvaluationController = {
    // Get all student evaluations
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

    // Create a new student evaluation
    async createStudentEvaluation(req, res) {
        const studentEvaluationData = req.body;
        try {
            const newStudentEvaluation = await StudentEvaluation.create(studentEvaluationData);
            res.json({ message: 'Student evaluation created successfully', newStudentEvaluation });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a student evaluation by ID
    async updateStudentEvaluation(req, res) {
        const studentEvaluationId = req.params.id;
        const updatedStudentEvaluationData = req.body;
        try {
            const studentEvaluation = await StudentEvaluation.findByPk(studentEvaluationId);

            if (studentEvaluation) {
                studentEvaluation.set(updatedStudentEvaluationData);
                await studentEvaluation.save();

                res.json({ message: 'Student evaluation updated successfully', studentEvaluation });
            } else {
                res.status(404).json({ message: 'Student evaluation not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a student evaluation by ID
    async deleteStudentEvaluation(req, res) {
        const studentEvaluationId = req.params.id;
        try {
            const success = await StudentEvaluation.destroy({ where: { id: studentEvaluationId } });

            if (success) {
                res.json({ message: 'Student evaluation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Student evaluation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StudentEvaluationController;
