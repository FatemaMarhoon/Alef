const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Payment = require('../models/payment')(sequelize, DataTypes);
const Student = require('../models/Student')(sequelize, DataTypes);

Payment.belongsTo(Student, { foreignKey: 'student_id' });

const PaymentController = {
    async getAllPayments(req, res) {
        try {
            const payments = await Payment.findAll({
                include: Student
            });
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving payments.' });
        }
    },

    async createPayment(req, res) {
        const paymentData = req.body;
        try {
            const newPayment = await Payment.create(paymentData);
            res.status(201).json({
                message: 'Payment created successfully',
                payment: newPayment,
            });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create a new payment. Please check your request data.', message: error.message });
        }
    },

    async updatePayment(req, res) {
        const paymentId = req.params.id;
        const updatedPaymentData = req.body;
        try {
            const payment = await Payment.findByPk(paymentId);

            if (payment) {
                payment.set(updatedPaymentData);
                await payment.save();

                res.json({ message: 'Payment updated successfully', payment: payment });
            } else {
                res.status(404).json({ message: 'Payment not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while updating the payment.', message: error.message });
        }
    },

    async deletePayment(req, res) {
        const paymentId = req.params.id;
        try {
            const success = await Payment.destroy({ where: { id: paymentId } });

            if (success) {
                res.json({ message: 'Payment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while deleting the payment.' });
        }
    },
};

module.exports = PaymentController;
