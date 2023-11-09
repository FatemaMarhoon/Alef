const express = require('express');
const SubscriptionPlanController = require('../controllers/SubscriptionPlanController');

const router = express.Router();

// Get all subscription plans
router.get('/', SubscriptionPlanController.getAllSubscriptionPlans);

// You can add more routes for other CRUD operations if needed

module.exports = router;
