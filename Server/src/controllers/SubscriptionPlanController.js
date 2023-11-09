const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const SubscriptionPlan = require('../models/subscription_plan')(sequelize, DataTypes);// Import your SubscriptionPlan model

const SubscriptionPlanController = {
    async getAllSubscriptionPlans(req, res) {
        try {
            const subscriptionPlans = await SubscriptionPlan.findAll();
            res.json(subscriptionPlans);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while fetching subscription plans.' });
        }
    },

    // You can add more functions as needed, e.g., getSubscriptionPlanById, createSubscriptionPlan, updateSubscriptionPlan, deleteSubscriptionPlan, etc.
};

module.exports = SubscriptionPlanController;
