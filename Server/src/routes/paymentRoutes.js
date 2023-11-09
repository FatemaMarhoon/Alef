const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Get all payments
router.get('/', PaymentController.getAllPayments);

// Create a new payment
router.post('/', PaymentController.createPayment);



// Update a payment by ID
router.put('/:id', PaymentController.updatePayment);

// Delete a payment by ID
router.delete('/:id', PaymentController.deletePayment);

module.exports = router;
