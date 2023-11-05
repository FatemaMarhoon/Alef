const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const User = require('../models/user')(sequelize, DataTypes);
const Notification = require('../models/notification')(sequelize, DataTypes);


Notification.belongsTo(User,  { foreignKey: 'user_id' });

const NotificationController = {
    async getAllNotifications(req, res) {
        try {
            const notifications = await Notification.findAll(
                {
                    include: User
                }
            ); 
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = NotificationController;