const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Request = require('../models/request')(sequelize, DataTypes);
const Plan = require('../models/subscription_plan')(sequelize, DataTypes);

Request.belongsTo(Plan, { foreignKey: 'plan_id' });
Plan.hasMany(Request, { foreignKey: 'plan_id' });

const LogsController = require('./LogController');
const UsersController = require('./UsersController');

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

    async createRequest(req, res) {
        const user_id = await UsersController.getCurrentUser(req, res);

        const { preschool_name, representitive_name, CR, phone, email, plan_id, status } = req.body;
        const RequestData = { preschool_name, representitive_name, CR, phone, email, plan_id, status }
        try {
            if (!preschool_name){
                return res.status(400).json({ message: "Preschool Name is Required." });
            }

            if (!representitive_name){
                return res.status(400).json({ message: "Representitive Name is Required." });
            }

            if (!CR){
                return res.status(400).json({ message: "CR is Required." });
            }

            if (!phone){
                return res.status(400).json({ message: "Contact Number is Required." });
            }

            if (!email){
                return res.status(400).json({ message: "Email is Required." });
            }
            
            if (!plan_id) {
                return res.status(400).json({ message: "Plan Id is Required." });
            }

            //create log
            await LogsController.createLog({
                type: 'Request Creation',
                original_values: JSON.stringify(RequestData),
                current_values: JSON.stringify(RequestData),
                user_id: user_id
            });


            const newRequest = await Request.create({
                preschool_name,
                representitive_name,
                CR,
                phone,
                email,
                plan_id,
                status: "Pending"
            });
            return res.status(201).json({ message: 'Request created successfully', request: newRequest });
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(RequestData),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            return res.status(500).json({ message: error.message });
        }
    },

    async getRequestById(req, res) {
        const requestId = req.params.id;
        try {
            const request = await Request.findByPk(requestId, {
                include: Plan
            });
            if (request) {
                res.json(request);
            } else {
                res.status(404).json({ message: 'Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateRequest(req, res) {
        const requestId = req.params.id;
        const { preschool_name, representitive_name, CR, phone, email, plan_id, status } = req.body;

        try {
            const request = await Request.findByPk(requestId);
            if (request) {
                request.preschool_name = preschool_name;
                request.representitive_name = representitive_name;
                request.CR = CR;
                request.phone = phone;
                request.email = email;
                request.plan_id = plan_id;
                request.status = status;
                await request.save();
                res.status(200).json({ message: 'Request updated successfully', request });
            } else {
                res.status(404).json({ message: 'Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteRequest(req, res) {
        const requestId = req.params.id;
        try {
            const request = await Request.findByPk(requestId);
            if (request) {
                await request.destroy();
                res.status(200).json({ message: 'Request deleted successfully' });
            } else {
                res.status(404).json({ message: 'Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateRequestStatus(req, res) {
        const requestId = req.params.id;
        const { status } = req.body;

        try {
            const request = await Request.findByPk(requestId);
            if (request) {
                request.status = status;
                await request.save();
                res.json({ message: 'Request status updated successfully', request });
            } else {
                res.status(404).json({ message: 'Request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


};

module.exports = RequestsController;
