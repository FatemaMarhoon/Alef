const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Payment = require('../models/payment')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const NotificationController = require('./NotificationController');
const UsersController = require('./UsersController');
const { verifyPreschool } = require('../config/token_validation');

Payment.belongsTo(Student, { foreignKey: 'student_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });

const PaymentController = {
    async getAllPayments(req, res) {
        const { preschool_id } = req.query;
        const { student_id } = req.query;
        try {
            if (preschool_id) {
                // access control 
                if ((await UsersController.getCurrentUserRole(req) == 'Admin'
                    || await UsersController.getCurrentUserRole(req) == 'Staff')
                    && await verifyPreschool(preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }

                const payments = await Payment.findAll({
                    include: { model: Student, as: 'Student', where: { preschool_id: preschool_id } }
                });

                return res.status(200).json(payments);
            }
            else if (student_id) {
                const student = await Student.findByPk(student_id);
                // access control 
                if (await UsersController.getCurrentUserRole(req) == 'Parent' && await UsersController.getCurrentUser(req) == student.user_id) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }

                const payments = await Payment.findAll({
                    where: { student_id: student_id }
                });

                return res.status(200).json(payments);
            }
            else {
                return res.status(400).json({ message: "Specify Preschool or Student Id to get list of payments." })
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async getPaymentById(req, res) {
        const paymentId = req.params.id;
        try {
            const payment = await Payment.findOne({ where: { id: paymentId }, include: { model: Student, as: "Student" } });

            if (payment) {
                // access control 
                const preschoolStaff = (await UsersController.getCurrentUserRole(req) == 'Admin'
                    || await UsersController.getCurrentUserRole(req) == 'Staff')
                    && await verifyPreschool(payment.preschool_id, req) == false
                const owner = await UsersController.getCurrentUserRole(req) == 'Parent'
                    && await UsersController.getCurrentUser(req) == payment.Student.user_id;

                if (preschoolStaff || owner) {
                    return res.status(200).json(payment);
                } else {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
            }
            else {
                return res.status(404).json({ message: 'Payment not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async createPayment(req, res) {
        const { type, fees, due_date, student_id, notes } = req.body;
        const paymentData = { fees, student_id, type, due_date, notes };
        try {
            if (!type) {
                return res.status(400).json({ message: "Type is Required." });
            }
            if (!fees) {
                return res.status(400).json({ message: "Fees is Required." });
            }
            if (!fees > 0) {
                return res.status(400).json({ message: "Fees must be more than zero." });
            }
            if (!due_date) {
                return res.status(400).json({ message: "Due Date is Required." });
            }
            if (!student_id) {
                return res.status(400).json({ message: "Student is Required." });
            }

            const student = await Student.findOne({ where: student_id, include: { model: User, as: "User" } });
            if (!student) {
                return res.status(404).json({ message: "Student Doesn't Exist." });
            }

            // access control 
            if (await verifyPreschool(student.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            paymentData.status = "Pending";
            const newPayment = await Payment.create(paymentData);
            if (newPayment) {
                //notify parent 
                if (student.User && student.User.role_name == "Parent") {
                    console.log("Parent User Found")
                    const title = "New Payment Request"
                    const body = "Dear Parent, Admin has requested a payment for your child. Please review and respond accordingly.";
                    NotificationController.pushSingleNotification(student.User.email, title, body);
                }
                return res.status(201).json({ message: 'Payment Record Created Successfully', payment: newPayment });
            }
        } catch (error) {
            return res.status(400).json({ message: 'Failed to create a new payment. Please check your request data.', message: error.message });
        }
    },

    async updatePayment(req, res) {
        const paymentId = req.params.id;
        const updatedPaymentData = req.body;
        try {
            if (updatedPaymentData.fees && !updatedPaymentData.fees > 0) {
                return res.status(400).json({ message: "Fees must be more than zero." });
            }
            const payment = await Payment.findByPk(paymentId);
            if (payment) {
                if (updatedPaymentData.status == "Paid") {
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
            const payment = await Payment.findOne({ where: { id: paymentId }, include: { model: Student, as: "Student" } });
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }

            // access control 
            if (await verifyPreschool(payment.Student.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            const success = await Payment.destroy({ where: { id: paymentId } });
            if (success) {
                return res.json({ message: 'Payment deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message});
        }
    },

    async remindParent(req, res) {
        const { id } = req.params;
        console.log(id);
        try {
            const payment = await Payment.findOne({ where: { id: id }, include: { model: Student, as: "Student" } });
            if (payment) {
                // access control 
                if (await verifyPreschool(payment.Student.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }

                const student = await Student.findOne({ where: payment.student_id, include: { model: User, as: "User" } });
                //if student has an associated parent account
                if (student.User) {
                    const response = await NotificationController.pushSingleNotification(student.User.email, "Payment Reminder", "You have pending payments, please reiew and act accordingly.")
                    if (response) {
                        return res.status(200).json({ message: 'Reminder sent successfully.' });
                    }
                    else {
                        return res.status(404).json({ message: 'Couldnt deliver the notification because user has not allow recieving.' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Parent Account not found' });
                }
            }
            else {
                return res.status(404).json({ message: 'Payment not found' });
            }
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

};

module.exports = PaymentController;
