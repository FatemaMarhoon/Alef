const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const Staff = require('../models/staff')(sequelize, DataTypes);

Class.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Staff.belongsTo(Class, { foreignKey: 'id' });
Preschool.hasMany(Class, { foreignKey: 'preschool_id' });
Class.belongsTo(Staff, { foreignKey: 'supervisor' });

const LogsController = require('./LogController');
const UsersController = require('./UsersController');

const ClassController = {
    async getAllClasses(req, res) {
        try {
            const { preschoolId } = req.params;
            const classes = await Class.findAll({
                where: { preschool_id: preschoolId },
                include: [Preschool, Staff]
            });
            res.json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getClassesByStaffId(req, res) {
        const { staffId } = req.params;
        try {
            // Find all classes where the staff is the supervisor
            const classes = await Class.findAll({
                where: { supervisor: staffId },
                include: [Preschool, Staff],
            });

            if (classes.length > 0) {
                res.json({ classes });
            } else {
                res.status(404).json({ message: 'No classes found for the specified staff ID' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createClass(req, res) {
        const classData = req.body;
        const user_id = await UsersController.getCurrentUser(req, res);

        try {

            // Log validation error
            await LogsController.createLog({
                type: 'Class Creation',
                original_values: JSON.stringify(classData),
                current_values: JSON.stringify(classData),
                user_id: user_id
            });
            const newClass = await Class.create(classData);
            res.json({ message: 'Class created successfully', newClass });
        } catch (error) {
            // Log validation error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(classData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });
        }
    },


    async updateClass(req, res) {
        const classId = req.params.id; // Use the correct parameter name
        const updatedClassData = req.body;
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            const classObj = await Class.findByPk(classId); // Change variable name
            if (classObj) {
                const originalValues = JSON.stringify(classObj.toJSON()); // Store the original values before the update

                classObj.set(updatedClassData);
                await classObj.save();
                const newValues = JSON.stringify(classObj.toJSON()); // Store the updated values after the update
                await LogsController.createLog({
                    type: 'Class Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });
                res.json({ message: 'Class updated successfully', class: classObj }); // Update variable name in the response
            } else {
                res.status(404).json({ message: 'Class not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteClass(req, res) {
        const classId = req.params.id; // Use the correct parameter name
        const user_id = await UsersController.getCurrentUser(req, res);
        let deletedClassData; // Declare the variable outside the block
        try {
            const classToDelete = await Class.findByPk(classId);
            if (classToDelete) {
                deletedClassData = JSON.stringify(classToDelete.toJSON()); // Store class data before deletion
                const success = await Class.destroy({ where: { id: classId } });
                if (success) {
                    // Create a log entry for the class deletion
                    await LogsController.createLog({
                        type: 'Class Deletion',
                        original_values: deletedClassData,
                        current_values: 'Class deleted',
                        user_id: user_id
                    });

                    res.json({ message: 'Class deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Class not found' });
                }
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            if (deletedClassData) {
                // Create a log entry for the error if deletedClassData is defined
                await LogsController.createLog({
                    type: 'Error',
                    original_values: deletedClassData,
                    current_values: JSON.stringify({ error: error.message }),
                    user_id: user_id
                });
            } else {
                // Handle the error if deletedClassData is not defined
                console.error('Error deleting class:', error);
            }

            res.status(500).json({ message: error.message });
        }
    },



    async getClassById(req, res) {
        const classId = req.params.id; // Use the correct parameter name
        try {
            const classObj = await Class.findByPk(classId, {
                include: [Preschool, Staff], // Include any associations you need
            });

            if (classObj) {
                res.json({ message: 'Class found', class: classObj });
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getSumOfClassCapacitiesByGrade(req, res) {
        try {
            const { preschoolId, grade } = req.params;

            // Fetch all classes for the specified preschool and grade
            const classes = await Class.findAll({
                where: { preschool_id: preschoolId, grade: grade },
            });

            // Calculate the sum of capacities
            const sumOfCapacities = classes.reduce((sum, cls) => sum + cls.capacity, 0);

            res.json({ sumOfCapacities });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
module.exports = ClassController;
