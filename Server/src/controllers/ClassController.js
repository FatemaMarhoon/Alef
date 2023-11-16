const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const Staff = require('../models/Staff')(sequelize, DataTypes);

Class.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Staff.belongsTo(Class, { foreignKey: 'id' });
Preschool.hasMany(Class, { foreignKey: 'preschool_id' });
Class.belongsTo(Staff, { foreignKey: 'id' });

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

    async createClass(req, res) {
        const classData = req.body;
        try {
            const newClass = await Class.create(classData);
            res.json({ message: 'Class created successfully', newClass });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateClass(req, res) {
        const classId = req.params.id; // Use the correct parameter name
        const updatedClassData = req.body;
        try {
            const classObj = await Class.findByPk(classId); // Change variable name

            if (classObj) {
                classObj.set(updatedClassData);
                await classObj.save();

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
        try {
            const success = await Class.destroy({ where: { id: classId } });

            if (success) {
                res.json({ message: 'Class deleted successfully' });
            } else {
                res.status(404).json({ message: 'Class not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ClassController;
