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

    async createRequest(req, res) {

        const { preschool_name, representitive_name, CR, phone, email, plan_id, status } = req.body;
        try {
            const newRequest = await Request.create({
                preschool_name,
                representitive_name,
                CR,
                phone,
                email,
                plan_id,
                status: "Pending"
            });
            return res.json({ message: 'Request created successfully', request: newRequest });
        } catch (error) {
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
                res.json({ message: 'Request updated successfully', request });
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
                res.json({ message: 'Request deleted successfully' });
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
