const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const StaticValues = require('../models/static_values')(sequelize, DataTypes);

const StaticValuesController = {
    async getAllRequestStatuses(req, res) {
        try {
            const statuses = await StaticValues.findAll({
                where: { CategoryName: 'Request Status' }
            });
            return res.json(statuses);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
    
    
    //Staff Roles 
    async getAllRoles(req, res) {
        try {
            const roles = await StaticValues.findAll({
                where: { CategoryName: 'Role' }
            });
            if (roles) {
                console.log(roles)
            }
            return res.json(roles);
        } catch (error) {
           return res.status(500).json({ message: error.message });
        }
    },

    //Payment Types 
    async getAllPaymentTypes(req, res) {
        try {
            const types = await StaticValues.findAll({
                where: { CategoryName: 'Payment Type' }
            });
            res.json(types);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //Payment Statuses 
    async getAllPaymentStatuses(req, res) {
        try {
            const statuses = await StaticValues.findAll({
                where: { CategoryName: 'Payment Status' }
            });
            res.json(statuses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //Guardian Types 
    async getAllGuardianTypes(req, res) {
        try {
            const types = await StaticValues.findAll({
                where: { CategoryName: 'Guardian Type' }
            });
            res.json(types);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    //Attendance Statuses 
    async getAllAttendanceStatuses(req, res) {
        try {
            const statuses = await StaticValues.findAll({
                where: { CategoryName: 'Attendance Status' }
            });
            res.json(statuses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    //Application Statuses 
    async getAllApplicationStatuses(req, res) {
        try {
            const statuses = await StaticValues.findAll({
                where: { CategoryName: 'Application Status' }
            });
            res.json(statuses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StaticValuesController;