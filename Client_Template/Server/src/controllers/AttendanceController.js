const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/Student')(sequelize, DataTypes);
const Attendance = require('../models/Attendance')(sequelize, DataTypes);

Attendance.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(Attendance, { foreignKey: 'student_id' });

const AttendanceController = {
    async getAllAttendances(req, res) {
        try {
            const attendances = await Attendance.findAll({
                include: Student,
            });
            res.json(attendances);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = AttendanceController;