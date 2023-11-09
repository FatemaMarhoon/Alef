const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Staff = require('../models/Staff')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Staff.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Staff, { foreignKey: 'preschool_id' });

const StaffController = {
    async getAllStaff(req, res) {
        try {
            const staffMembers = await Staff.findAll({
                include: Preschool
            });
            res.json(staffMembers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStaffById(req, res) {
        const { staff_id } = req.params;
        try {
            const staffMember = await Staff.findByPk(staff_id);
            if (staffMember) {
                res.json(staffMember);
            } else {
                res.status(404).json({ message: 'Staff member not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createStaff(req, res) {
        const staffData = req.body;
        try {
            const staff = await Staff.create(staffData);
            res.json({ message: 'Staff member created successfully', staff });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStaff(req, res) {
        const { staff_id } = req.params;
        const updatedStaffData = req.body;
        try {
            const staff = await Staff.findByPk(staff_id);

            if (staff) {
                staff.set(updatedStaffData);
                await staff.save();

                res.json({ message: 'Staff member updated successfully', staff });
            } else {
                res.status(404).json({ message: 'Staff member not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStaff(req, res) {
        const { staff_id } = req.params;
        try {
            const success = await Staff.destroy({ where: { id: staff_id } });
            if (success) {
                res.json({ message: 'Staff member deleted successfully' });
            } else {
                res.status(404).json({ message: 'Staff member not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = StaffController;
