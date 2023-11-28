const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Staff = require('../models/staff')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Staff.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Staff, { foreignKey: 'preschool_id' });

const validateStaffData = (staffData) => {
    const requiredFields = ['preschool_id', 'staff_role_name', 'name', 'CPR', 'phone', 'hire_date'];
    for (const field of requiredFields) {
        if (!staffData[field]) {
            return { isValid: false, message: `${field} is required` };
        }
    }

    // Additional validations for specific fields
    if (!Number.isInteger(staffData.CPR) || String(staffData.CPR).length !== 9) {
        return { isValid: false, message: 'CPR must be a 9-digit integer' };
    }

    if (!Number.isInteger(staffData.phone) || String(staffData.phone).length !== 8) {
        return { isValid: false, message: 'Phone must be an 8-digit integer' };
    }

    // Add more validations as needed

    return { isValid: true };
}

const StaffController = {
    async getAllStaff(req, res) {
        try {
            const { preschoolId } = req.params;

            const staffMembers = await Staff.findAll({
                where: { preschool_id: preschoolId },

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
        // Perform validations
        const validation = validateStaffData(staffData);

        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

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
        // Perform validations
        const validation = validateStaffData(updatedStaffData);

        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

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

    async getAllStaffC(req, res) {
        try {
            const { preschoolId } = req.params;

            const staffMembers = await Staff.findAll({
                where: sequelize.literal(`
                    \`Staff\`.\`id\` NOT IN (
                      SELECT \`supervisor\` FROM \`Classes\`
                      WHERE \`supervisor\` IS NOT NULL
                    )
                    AND \`Staff\`.\`preschool_id\` = ${preschoolId}
                    AND \`Staff\`.\`staff_role_name\` = 'teacher'
                `),
                include: [Preschool],
            });

            res.json(staffMembers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


};

module.exports = StaffController;
