const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const NotificationController = require('./NotificationController');

const Grade = require('../models/grade_capacity')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);

Application.belongsTo(User, { foreignKey: 'created_by' });
Preschool.hasMany(Grade, { foreignKey: 'preschool_id' });
Grade.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const GradesController = {
    /* ------- APIs --------- */
    async getAllGradesCapacities(req, res) {
        const preschool = req.query.preschool;
        console.log(preschool)
        try {
            if (preschool) {
                const grades = await Grade.findAll({
                    where: { preschool_id: preschool }
                });
                return res.status(200).json(grades);
            }
            else {
                res.status(500).json({ message: "Please specify a preschool id" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getGradeCapacityById(req, res) {
        const gradeId = req.params.gradeId;
        try {
            const gradeCapacity = await Grade.findByPk(gradeId);
            if (gradeCapacity) {
                return res.status(200).json(gradeCapacity);
            } else {
                res.status(404).json({ message: 'Grade capacity not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async addGradeCapacity(req, res) {
        const { grade, capacity } = req.body;
        try {
            if (grade && capacity) {
                const newGrade = await Grade.create({ grade: grade, capacity: capacity });
                return res.status(201).json({
                    message: 'Grade Capacity added successfully',
                    Grade: newGrade,
                });
            }
            else {
                return res.status(500).json({ message: "Incomplete information. Please provide both grade and capacity." });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async trackWaitlist(preschool, grade) {
        const available = await GradesController.checkGradeCapacity(preschool, grade);
        //if it has space, pick the oldest waitlisted application, change status and notify parent
        if (available) {
            const waitlisted = await Application.findOne({
                where: {
                    status: 'Waitlist',
                },
                order: [['createdAt', 'ASC']],
                include: User
            });
            if (waitlisted) {
                waitlisted.status = "Pending"
                waitlisted.save();

                //notify parent 
                if (waitlisted.User.role_name == "Parent") {
                    await NotificationController.pushSingleNotification(waitlisted.User.email, "Update: The Wait Is Over!", "Your child's application is now under review. Please book an appointment for the evaluation to proceed.");
                }
            }
        }
    },

    async updateGradeCapacities(req, res) {
        const { gradesList, preschool_id } = req.body;
        try {
            //remove existing 
            await Grade.destroy({
                where: { preschool_id: preschool_id }
            });

            //insert new records
            for (const record of gradesList) {
                record.preschool_id = preschool_id;
                await Grade.create(record);
            }

            return res.status(200).json({ message: 'Grades Capacity Updated Successfully.' })

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    /* ------- Internal Usage Functions --------- */

    async checkGradeCapacity(preschool, grade) {
        try {
            if (preschool && grade) {
                //find the full capacity of that grade
                const gradeCapacity = await Grade.findOne({
                    where: { preschool_id: preschool, grade: grade }
                });

                //find how many applications currently submitted for this grade
                const currentApplications = await Application.findAll({
                    where: { preschool_id: preschool, grade: grade }
                });

                //find how many students currently enrolled in this grade
                const currentStudents = await Student.findAll({
                    where: { preschool_id: preschool, grade: grade }
                });

                const current = currentApplications.length + currentStudents.length;

                //return true or false 
                if (gradeCapacity.capacity >= current) {
                    return true;
                }
                else {
                    return false
                }
            }

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    },
};


module.exports = GradesController;