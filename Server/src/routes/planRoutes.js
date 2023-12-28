const express = require('express');
const SubscriptionPlanController = require('../controllers/SubscriptionPlanController');

const router = express.Router();

// Get all subscription plans
router.get('/', SubscriptionPlanController.getAllSubscriptionPlans);

// Get subscription plan by Id
router.get('/:id', SubscriptionPlanController.getSubscriptionPlanById);

module.exports = router;
