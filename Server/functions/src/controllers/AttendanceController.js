const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Student = require('../models/student')(sequelize, DataTypes);
const Attendance = require('../models/attendance')(sequelize, DataTypes);

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

    async createAttendance(req, res) {
        const attendanceData = req.body;
        try {
            const newAttendance = await Attendance.create(attendanceData);
            res.json({ message: 'Attendance created successfully', newAttendance });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateAttendance(req, res) {
        const attendanceId = req.params.id;
        const updatedAttendanceData = req.body;
        try {
            const attendance = await Attendance.findByPk(attendanceId);

            if (attendance) {
                attendance.set(updatedAttendanceData);
                await attendance.save();

                res.json({ message: 'Attendance updated successfully', attendance });
            } else {
                res.status(404).json({ message: 'Attendance not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteAttendance(req, res) {
        const attendanceId = req.params.id;
        try {
            const success = await Attendance.destroy({ where: { id: attendanceId } });

            if (success) {
                res.json({ message: 'Attendance deleted successfully' });
            } else {
                res.status(404).json({ message: 'Attendance not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = AttendanceController;