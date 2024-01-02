const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const { checkToken, checkStaff } = require('../config/token_validation');

const router = express.Router();

// Get all payments
router.get('/',checkToken, PaymentController.getAllPayments);

// Create a new payment
router.post('/',checkStaff, PaymentController.createPayment);

//notify parent
router.get('/remind/:id',checkStaff, PaymentController.remindParent);

router.get('/:id',checkToken, PaymentController.getPaymentById);

// Update a payment by ID
router.put('/:id', PaymentController.updatePayment);

// Delete a payment by ID
router.delete('/:id',checkStaff, PaymentController.deletePayment);

module.exports = router;
