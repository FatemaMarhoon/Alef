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
            console.log("detectFace function triggered");
            // Log the entire req object
            console.log("Full request object:", req);

            // Check if the file is present in the request
            if (!req.file) {
                console.log("No file uploaded");
                return res.status(400).json({ message: "No file uploaded" });
            }

            const file = req.file;
            console.dir("Uploaded file:", req.file);

            // Log the uploaded file information
            res.json({ message: "File uploaded successfully", filename: req.file });
            // Get the Buffer from the uploaded file
            // const buffer = req.file.buffer;
            // console.log('Buffer:', buffer);

            // Convert the Buffer to base64
            // const inputImageBase64 = file.toString('base64');
            // console.log("is this being called?");

            // Simulate a successful result without running the Python script
            const result = {
                success: true,
                data: 'Simulated result for testing purposes'
            };

            // Send the simulated successful result
            res.status(200).send(result.data);
        } catch (error) {
            console.log("this is being called tara");
            console.error('Error in detectFace function:', error);
            res.status(500).send('Internal Server Error');
        }
    },



};

async function runPythonScript(pythonScriptPath, inputImage) {
    try {
        // Ensure Python dependencies are installed
        await installPythonDependencies();

        const options = {
            scriptPath: './src/pythonScript/',
            args: [inputImage], // Pass input image as an argument
        };

        // Run the Python script
        const result = await PythonShell.run(pythonScriptPath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error running Python script:', error);
        throw error;
    }
}



async function installPythonDependencies() {
    try {
        // Install Python dependencies using pip
        const command = 'pip install -r ./src/pythonScript/requirements.txt';
        const { stdout, stderr } = await exec(command);
        console.log('Dependencies installed:', stdout);
    } catch (error) {
        console.error('Error installing Python dependencies:', error.stderr || error.message);
        throw error;
    }
}

module.exports = AttendanceController;
