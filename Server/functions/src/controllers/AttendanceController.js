const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const { PythonShell } = require('python-shell');
const { exec } = require('child_process');

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
    async getAttendancesByClassId(req, res) {
        try {
            const { classId } = req.params;

            const attendances = await Attendance.findAll({
                include: {
                    model: Student,
                    where: { class_id: classId }, // Additional condition to filter students based on class_id
                },
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

    async detectFace(req, res) {
        try {
            const result = await runPythonScript('app.py');
            res.send(result);
        } catch (error) {
            console.error('Error executing test script:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

async function runPythonScript(pythonScriptPath) {
    const result = installPythonDependencies()
        .then(async (dependencyResult) => {
            console.log(dependencyResult);
            const options = {
                scriptPath: './src/pythonScript/',
                args: [/* any arguments you want to pass to your Python script */],
            };

            const result = await PythonShell.run(pythonScriptPath, options);
            console.log(result);
            return result;
        });
    return result;
}

async function installPythonDependencies() {
    const command = 'pip install -r ./src/pythonScript/requirements.txt';

    const result = exec(command);
    console.log(result);
    return result;
}

module.exports = AttendanceController;
