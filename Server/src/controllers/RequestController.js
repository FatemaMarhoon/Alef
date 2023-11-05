const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Request = require('../models/request')(sequelize, DataTypes);
const Plan = require('../models/subscription_plan')(sequelize, DataTypes);

Request.belongsTo(Plan, { foreignKey: 'plan_id' });
Plan.hasMany(Request, { foreignKey: 'plan_id' });

const RequestsController = {
    async getAllRequests(req, res) {
        try {
            const requests = await Request.findAll(
                {
                    include: Plan
                }
            ); 
            res.json(requests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // async createRequest(req, res) {
    //     const { preschool_name, representitive_name, CR, phone, email, plan_id, status_id } = req.body;
    //     const newRequest = new Request(preschool_name, representitive_name, CR, phone, email, plan_id, status_id);
    //     try {
    //         const requestId = await Request.create(newRequest);
    //         res.json({ message: 'Request created successfully', requestId });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
};

module.exports = RequestsController;
