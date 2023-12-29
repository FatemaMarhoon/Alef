const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Staff = require('../models/staff')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);

Staff.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Staff, { foreignKey: 'preschool_id' });

const LogsController = require('./LogController');
const UsersController = require('./UsersController');
const validateStaffData = (staffData) => {
    const requiredFields = ['preschool_id', 'staff_role_name', 'name', 'CPR', 'phone', 'hire_date'];
    for (const field of requiredFields) {
        if (!staffData[field]) {
            return { isValid: false, message: `${field} is required` };
        }
    }
    if (hireDate > new Date()) {
        return { isValid: false, message: 'Hire date must be a valid date and should not be in the future' };
    }
    // Additional validations for specific fields
    if (!Number.isInteger(staffData.CPR) || String(staffData.CPR).length !== 9) {
        return { isValid: false, message: 'CPR must be a 9-digit integer' };
    }
    // Additional validations for specific fields
    const cprString = String(staffData.CPR);
    if (cprString.length !== 9 || !/^\d+$/.test(cprString)) {
        return { isValid: false, message: 'CPR must be a 9-digit integer' };
    }

    if (!Number.isInteger(staffData.phone) || String(staffData.phone).length !== 8) {
        return { isValid: false, message: 'Phone must be an 8-digit integer' };
    }
    // Check if the hire date is in the future
    const hireDate = new Date(staffData.hire_date);
    const currentDate = new Date();
    if (hireDate > currentDate) {
        return { isValid: false, message: 'Hire date cannot be in the future' };
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

    async getStaffByUserId(req, res) {
        const { id } = req.params;
        try {
            const staffMember = await Staff.findOne({
                where: { user_id: id }
            });
            if (staffMember) {
                return res.status(200).json(staffMember);
            } else {
                return res.status(404).json({ message: 'Staff member not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    async createStaff(req, res) {
        const staffData = req.body;
        // Perform validations
        const validation = validateStaffData(staffData);
        const user_id = await UsersController.getCurrentUser(req, res);

        // Check if the email already exists
        const existingUser = await Staff.findOne({ where: { email: staffData.email } });

        if (existingUser) {
            //create log
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(staffData),
                current_values: JSON.stringify("Email already exists"),
                user_id: user_id
            });
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if the CPR already exists
        const existingCPRUser = await Staff.findOne({ where: { CPR: staffData.CPR } });
        if (existingCPRUser) {
            return res.status(400).json({ message: 'CPR already exists' });
        }

        if (!validation.isValid) {
            //create log
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(staffData),
                current_values: JSON.stringify(validation.message),
                user_id: user_id
            });
            return res.status(400).json({ message: validation.message });
        }

        try {
            //create log
            await LogsController.createLog({
                type: 'Staff Creation',
                original_values: JSON.stringify(staffData),
                current_values: JSON.stringify(staffData),
                user_id: user_id
                //  user_id: 28
            });
            const staff = await Staff.create(staffData);
            res.json({ message: 'Staff member created successfully', staff });
        } catch (error) {
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(staffData),
                current_values: JSON.stringify(error.message),
                user_id: user_id
                //  user_id: 28
            });
            res.status(500).json({ message: error.message });
        }
    },

    async updateStaff(req, res) {
        const { staff_id } = req.params;
        const updatedStaffData = req.body;
        // Perform validations
        const validation = validateStaffData(updatedStaffData);
        const user_id = await UsersController.getCurrentUser(req, res);
        if (!validation.isValid) {
            //create log
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStaffData),
                current_values: JSON.stringify(validation.message),
                user_id: user_id
            });
            return res.status(400).json({ message: validation.message });
        }
        try {
            const staff = await Staff.findByPk(staff_id);
            if (staff) {
                const originalValues = JSON.stringify(staff.toJSON()); // Store the original values before the update
                staff.set(updatedStaffData);
                await staff.save();
                const newValues = JSON.stringify(staff.toJSON()); // Store the updated values after the update
                // Create a log entry for the student update
                await LogsController.createLog({
                    type: 'Staff Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });
                res.json({ message: 'Staff member updated successfully', staff });
            } else {
                res.status(404).json({ message: 'Staff member not found or no changes made' });
            }
        } catch (error) {
            //create log
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(updatedStaffData),
                current_values: JSON.stringify(error.message),
                user_id: user_id
            });
            res.status(500).json({ message: error.message });
        }
    },

    async deleteStaff(req, res) {
        const { staff_id } = req.params;
        const user_id = await UsersController.getCurrentUser(req, res);
        let deletedStaffData; // Declare the variable outside the block

        try {
            const staff = await Staff.findByPk(staff_id);

            if (staff) {
                deletedStaffData = JSON.stringify(staff.toJSON()); // Store the student data before deletion

                const success = await Staff.destroy({ where: { id: staff_id } });

                if (success) {
                    // Create a log entry for the student deletion
                    await LogsController.createLog({
                        type: 'Staff Deletion',
                        original_values: deletedStaffData,
                        current_values: 'Staff deleted',
                        user_id: user_id
                    });

                    res.json({ message: 'staff deleted successfully' });
                } else {
                    res.status(404).json({ message: 'staff not found' });
                }
            } else {
                res.status(404).json({ message: 'staff not found' });
            }
        } catch (error) {
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(deletedStaffData),
                current_values: JSON.stringify(error.message),
                user_id: user_id
            });
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
                    AND \`Staff\`.\`staff_role_name\` = 'Teacher'
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
