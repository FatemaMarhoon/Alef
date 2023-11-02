const Staff = require('../models/Staff');

const StaffController = {

    async getAllStaff(req, res) {
        try {
            const staffMembers = await Staff.findAll();
            res.json(staffMembers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getStaffById(req, res) {
        const { staff_id } = req.params;
        try {
            const staffMember = await Staff.findById(staff_id);
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
            const staffId = await Staff.create(staffData);
            res.json({ message: 'Staff member created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateStaff(req, res) {
        const { staff_id } = req.params;
        const updatedStaff = req.body;
        try {
            const success = await Staff.update(staff_id, updatedStaff);
            if (success) {
                res.json({ message: 'Staff member updated successfully' });
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
            const success = await Staff.delete(staff_id);
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
