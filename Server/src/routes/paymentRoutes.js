const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Get all users
router.get('/', PaymentController.getAllPayments);

module.exports = router;