const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const StaticValues = require('../models/static_values')(sequelize, DataTypes);

const StaticValuesController = {
    async getAllRequestStatuses(req, res) {
        try {
            const statuses = StaticValues.findOne({
                where: { CategoryName: 'Request Status' }
            });
            res.json(statuses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // async findRequestStatusByName(name){
    //     const query = 'SELECT * FROM Request_Status WHERE status_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    
    // //Stationary Request Statues 
    // async findAllStationaryRequestStatuses() {
    //     const query = 'SELECT * FROM Stationary_Request_Status';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findStationaryRequestStatusByName(name){
    //     const query = 'SELECT * FROM Stationary_Request_Status WHERE status_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    
    // //Staff Roles 
    // async findAllStaffRoles() {
    //     const query = 'SELECT * FROM Staff_Role';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findStaffRoleByName(name){
    //     const query = 'SELECT * FROM Staff_Role WHERE role_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // //User Roles
    // async findAllUserRoles() {
    //     const query = 'SELECT * FROM Role';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findUserRoleByName(name){
    //     const query = 'SELECT * FROM Staff_Role WHERE role_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },


    // //Payment Types 
    // async findAllPaymentTypes() {
    //     const query = 'SELECT * FROM Payment_Type';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findPaymentTypeByName(name){
    //     const query = 'SELECT * FROM Payment_Type WHERE type_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },


    // //Payment Statuses 
    // async findAllPaymentStatuses() {
    //     const query = 'SELECT * FROM Payment_Status';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findPaymentStatusByName(name){
    //     const query = 'SELECT * FROM Payment_Status WHERE status_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // //Guardian Types 
    // async findAllGuardianTypes() {
    //     const query = 'SELECT * FROM Guardian_Type';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findGuardianTypeByName(name){
    //     const query = 'SELECT * FROM Guardian_Type WHERE type_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },


    // //Attendance Statuses 
    // async findAllAttendanceStatuses() {
    //     const query = 'SELECT * FROM Attendance_Status';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findAttendanceStatusByName(name){
    //     const query = 'SELECT * FROM Attendance_Status WHERE status_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },


    // //Application Statuses 
    // async findAllApplicationStatuses() {
    //     const query = 'SELECT * FROM Application_Status';
    //     try {
    //         const [rows, fields] = await db.query(query);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // async findApplicationStatusByName(name){
    //     const query = 'SELECT * FROM Application_Status WHERE status_name = ?';
    //     try {
    //         const [rows, fields] = await db.query(query, [name]);
    //         return rows;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};

module.exports = StaticValuesController;