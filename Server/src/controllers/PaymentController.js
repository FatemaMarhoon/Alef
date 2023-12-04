const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const preschool = require('../models/preschool');
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Payment = require('../models/payment')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);

Payment.belongsTo(Student, { foreignKey: 'student_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const PaymentController = {
    async getAllPayments(req, res) {
        const {preschool_id} = req.query;
        const {student_id} = req.query;

        try {
            if (preschool_id) {
                const payments = await Payment.findAll({
                    include: { model: Student, as: 'Student', where: {preschool_id : preschool_id} }
                });
    
                return res.status(200).json(payments);
            }
            else if(student_id){
                const payments = await Payment.findAll({
                    where:{student_id:student_id}
                });
    
                return res.status(200).json(payments);
            }
            else {
                return res.status(400).json({ message: "Specify Preschool or Student Id to get list of payments." })
            }

        } catch (error) {
            return res.status(500).json({ message:error.message});
        }
    },

    async getPaymentById(req, res){
        const paymentId = req.params.id;
        try {
            const payment = await Payment.findByPk(paymentId);

            if (payment) {
                return res.status(200).json( payment );
            }
            else {
                return res.status(404).json({ message: 'Payment not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message:error.message});
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
                if (updatedPaymentData.status == "Paid"){
                    updatedPaymentData.paid_on = new Date();
                }
                payment.set(updatedPaymentData);
                await payment.save();

                return res.status(200).json({ message: 'Payment updated successfully', payment: payment });
            } else {
                return res.status(404).json({ message: 'Payment not found or no changes made' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
