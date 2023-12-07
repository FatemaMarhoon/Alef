const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const Staff = require('../models/Staff')(sequelize, DataTypes);

Class.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Staff.belongsTo(Class, { foreignKey: 'id' });
Preschool.hasMany(Class, { foreignKey: 'preschool_id' });
Class.belongsTo(Staff, { foreignKey: 'supervisor' });


const LogsController = require('./LogController');
const UsersController = require('./UsersController');
// const checkSupervisorAvailability = async (req, res) => {
//     const { supervisor } = req.body;


//     try {
//         console.log('Checking supervisor availability for:', { supervisor });

//         // Query the database to check if the supervisor is assigned to another class in the same grade
//         const existingClass = await Class.findOne({
//             where: { supervisor },
//         });

//         console.log('Existing class:', existingClass);

//         if (existingClass) {
//             // Supervisor is already assigned to another class 
//             console.log(`Supervisor ${supervisor} is already assigned to another class.`);
//             // res.status(400).json({ error: `Supervisor ${supervisor} is already assigned to another class.`, isAvailable: false });
//             return false;
//         } else {
//             // Supervisor is available
//             console.log(`Supervisor ${supervisor} is available.`);
//             return true;
//         }
//     } catch (error) {
//         console.error('Error checking supervisor availability:', error);
//         res.status(500).json({ message: 'Internal Server Error', isAvailable: false });
//         return false;
//     }
// };


const ClassController = {
    async getAllClasses(req, res) {
        try {
            const { preschoolId } = req.params;
            // const preschoolId = req.query.preschool;
            const classes = await Class.findAll({
                where: { preschool_id: preschoolId },
                include: [Preschool, Staff]
            });
            res.json(classes);
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
                //user_id: 28
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
                //user_id: 28
            });
            res.status(500).json({ message: error.message });
        }
    },





    // async createClass(req, res) {
    //     try {
    //         console.log('Request Body:', req.body);

    //         const { supervisor } = req.body;

    //         // Check if the supervisor is available for the given grade
    //         const isSupervisorAvailable = await checkSupervisorAvailability(req, res);

    //         if (!isSupervisorAvailable) {
    //             // Return an error response if the supervisor is not available
    //             return res.status(400).json({ error: 'Supervisor is already assigned to another class in this grade.' });
    //         }

    //         // If supervisor is available, proceed with class creation
    //         const newClass = await Class.create({ ...req.body, supervisor });

    //         // Send a success response to the client
    //         res.json({ message: 'Class created successfully', newClass });
    //     } catch (error) {
    //         console.error('Error creating class:', error);
    //         res.status(500).json({ message: error.message });
    //     }
    // }


    // ,


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
//module.exports.checkSupervisorAvailability = checkSupervisorAvailability;
