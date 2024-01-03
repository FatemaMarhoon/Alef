const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');
const sequelize = require('../config/seq');
const Student = require('../models/student')(sequelize, DataTypes);
const StudentEvaluation = require('../models/student_evaluation')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');
const PDFDocument = require('pdfkit-table')
StudentEvaluation.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(StudentEvaluation, { foreignKey: 'student_id' });

const StudentEvaluationController = {
    // Get all student evaluations
    async getAllStudentEvaluations(req, res) {
        const { student_id } = req.query;
        try {


            if (student_id) {
                const student = await Student.findByPk(student_id);
                if (!student) {
                    return res.status(404).json({ message: 'Student Not Found.' });
                }
                // access control 
                if (await verifyPreschool(student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
                const studentEvaluations = await StudentEvaluation.findAll({
                    where: { student_id: student_id }
                });
                if (studentEvaluations.length) {
                    return res.status(200).json(studentEvaluations);
                }
                else {
                    return res.status(404).json({ message: 'No Evaluations Found.' });
                }
            }
            else {
                return res.status(400).json({ message: 'Please specify a student_id as query parameter.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async getEvaluationById(req, res) {
        const { id } = req.params;
        try {
            const studentEvaluations = await StudentEvaluation.findOne({ where: { id: id }, include: { model: Student, as: "Student" } });
            if (!studentEvaluations) {
                return res.status(404).json({ message: 'Student evaluation not found.' });
            }

            // access control 
            if (await verifyPreschool(studentEvaluations.Student.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            return res.status(200).json(studentEvaluations);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // Create a new student evaluation
    async createStudentEvaluation(req, res) {
        const studentEvaluationData = req.body;
        try {
            const student = await Student.findByPk(req.body.student_id);
            if (!student) {
                return res.status(404).json({ message: 'Student Not Found.' });
            }
            // access control 
            if (await verifyPreschool(student.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }
            const newStudentEvaluation = await StudentEvaluation.create(studentEvaluationData);
            return res.status(201).json({ message: 'Student evaluation created successfully', newStudentEvaluation });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // Update a student evaluation by ID
    async updateStudentEvaluation(req, res) {
        const studentEvaluationId = req.params.id;
        const updatedStudentEvaluationData = req.body;
        try {
            const studentEvaluation = await StudentEvaluation.findOne({ where: { id: studentEvaluationId }, include: { model: Student, as: "Student" } });

            if (studentEvaluation) {
                // access control 
                if (await verifyPreschool(studentEvaluation.student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
                studentEvaluation.set(updatedStudentEvaluationData);
                await studentEvaluation.save();

                return res.status(200).json({ message: 'Student evaluation updated successfully', studentEvaluation });
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
            const studentEvaluation = await StudentEvaluation.findOne({ where: { id: studentEvaluationId }, include: { model: Student, as: "Student" } });

            if (studentEvaluation) {
                // access control 
                if (await verifyPreschool(studentEvaluation.Student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
                const success = await StudentEvaluation.destroy({ where: { id: studentEvaluationId } });

                if (success) {
                    res.json({ message: 'Student evaluation deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Student evaluation not found' });
                }
            }
            else {
                res.status(404).json({ message: 'Student evaluation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },



    async getEvaluationReposrtById(req, res) {
        const { id } = req.params;
        console.log('Received studentId:', id);
        try {
            if (!id) {
                return res.status(400).json({ message: 'Invalid studentId' });
            }

            const studentEvaluation = await StudentEvaluation.findOne({ where: { student_id: id } });

            if (!studentEvaluation) {
                return res.status(404).json({ message: 'Evaluation Report has not been issued yet' });
            }


            const doc = new PDFDocument();

            const createdAt = studentEvaluation.createdAt.toLocaleDateString();
            const logoUrl = await FilesManager.generateSignedUrl('Alef_Arabic.png');
            // Download the image
            const logoResponse = await axios.get(logoUrl, { responseType: 'arraybuffer' });
            const logoBuffer = Buffer.from(logoResponse.data);

            const imageX = doc.page.width - 50 - 30;


            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="student_evaluation_${id}.pdf"`);

            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                res.end(pdfData);
            });

            // Add content to the PDF
            doc.image(logoBuffer, imageX, 10, { width: 70, height: 50 });

            doc.fontSize(18).text('Student Evaluation Report', { align: 'center', margin: 10 });
            doc.fontSize(10).text(`Issued at: ${createdAt}`, { align: 'right', margin: 10 });
            // Add table for Personal Skills with grades
            const personalGrades = {
                emotional_intelligence: studentEvaluation.emotional_intelligence,
                punctuality: studentEvaluation.punctuality,
                confidence: studentEvaluation.confidence,
                independence: studentEvaluation.independence,
            };
            const socialGrades = {
                global_citizenship: studentEvaluation.global_citizenship,
                behavior: studentEvaluation.behavior,
                oral_communication: studentEvaluation.oral_communication,
                communication: studentEvaluation.communication,
                neatness: studentEvaluation.neatness,

            };

            const academicGrades = {
                attentiveness: studentEvaluation.attentiveness,
                comprehension: studentEvaluation.comprehension,
                oral_communication: studentEvaluation.oral_communication,
                grammatical_competence: studentEvaluation.grammatical_competence,
                reading_proficiency: studentEvaluation.reading_proficiency,
                mathematics_proficiency: studentEvaluation.mathematics_proficiency,
                arabic_writing_skills: studentEvaluation.arabic_writing_skills,
                arabic_reading_skills: studentEvaluation.arabic_reading_skills,
                arabic_listening_speaking_skills: studentEvaluation.arabic_listening_speaking_skills,
            };

            const table = {
                title: 'Personal Skills',
                headers: [
                    { label: "Skills", property: 'skill', width: 250, headerColor: '#9EA1D4', align: 'center', headerOpacity: 1 },
                    { label: "Grade", property: 'grade', width: 200, headerColor: '#9EA1D4', align: 'center', headerOpacity: 1 },
                ],
                rows: Object.entries(personalGrades).map(([skill, personalGrades]) => [skill.replace('_', ' '), personalGrades]),
                options: {
                    margin: {
                        top: 10,

                    },
                },
                divider: { hLineWidth: 1 }, // Use a thin line thickness for subtle separation

            };
            doc.moveDown(3);
            doc.table(table, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font("Helvetica").fontSize(11);
                    indexColumn === 0 && doc.addBackground(rectRow, '#9EA1D4', 0.3);
                },
            });
            doc.moveDown(2);


            const socialSkills = {
                title: 'Social Skills',
                headers: [
                    { label: "Skills", property: 'skill', width: 250, renderer: null, headerColor: '#FD8A8A', align: 'center', headerOpacity: 1 },
                    { label: "Grade", property: 'grade', width: 200, renderer: null, headerColor: '#FD8A8A', align: 'center', headerOpacity: 1 },
                ],

                rows: Object.entries(socialGrades).map(([skill, socialGrades]) => [skill.replace('_', ' '), socialGrades]),
                options: {
                    margin: { top: 10 },
                },
            };
            doc.table(socialSkills, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font("Helvetica").fontSize(11);
                    indexColumn === 0 && doc.addBackground(rectRow, '#FD8A8A', 0.3);
                },
            });
            doc.moveDown(2);

            const academicSkills = {
                title: 'Academic Skills',
                headers: [
                    {
                        label: "Skills", property: 'skill', width: 250, renderer: null,
                        headerColor: '#A8D1D1', align: 'center', headerOpacity: 1,

                    },
                    { label: "Grade", property: 'grade', width: 200, renderer: null, headerColor: '#A8D1D1', align: 'center', headerOpacity: 1 },
                ],

                rows: Object.entries(academicGrades).map(([skill, academicGrades]) => [skill.replace('_', ' '), academicGrades]),
                options: {
                    margin: { top: 10 },
                },
            };
            // doc.table(academicSkills, 100, 200);
            doc.table(academicSkills, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font("Helvetica").fontSize(11);
                    indexColumn === 0 && doc.addBackground(rectRow, '#A8D1D1', 0.3);
                },
            });

            doc.end();

        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ message: error.message });
        }
    },


};

module.exports = StudentEvaluationController;
