const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Grade = require('../models/grade_capacity')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);


Preschool.hasMany(Grade,  { foreignKey: 'preschool_id' });
Grade.belongsTo(Preschool,  { foreignKey: 'preschool_id' });

const GradesController = {
    async getAllGrades(req, res) {
        try {
            const grades = await Grade.findAll(
                {
                    include: Preschool
                }
            ); 
            res.json(grades);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = GradesController;