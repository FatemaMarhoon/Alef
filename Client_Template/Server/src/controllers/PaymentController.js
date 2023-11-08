const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Payment = require('../models/payment')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);

Payment.belongsTo(Student, { foreignKey: 'student_id' });

const PaymentController = {
    async getAllPayments(req, res) {
        try {
            const payments = await Payment.findAll(
                {
                    include: Student
                }
            ); 
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = PaymentController;