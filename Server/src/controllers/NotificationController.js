const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const User = require('../models/user')(sequelize, DataTypes);
const Notification = require('../models/notification')(sequelize, DataTypes);

Notification.belongsTo(User, { foreignKey: 'user_id' });

const NotificationController = {
    async getAllNotifications(req, res) {
        try {
            const notifications = await Notification.findAll({
                include: User
            });
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving notifications.' });
        }
    },

    async createNotification(req, res) {
        try {
            const notificationData = req.body;
            const newNotification = await Notification.create(notificationData);
            res.status(201).json({
                message: 'Notification created successfully',
                notification: newNotification,
            });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create a new notification. Please check your request data.', message: error.message });
        }
    },

    async updateNotification(req, res) {
        const notificationId = req.params.id;
        const updatedNotificationData = req.body;
        try {
            const notification = await Notification.findByPk(notificationId);

            if (notification) {
                notification.set(updatedNotificationData);
                await notification.save();

                res.json({ message: 'Notification updated successfully', notification: notification });
            } else {
                res.status(404).json({ message: 'Notification not found or no changes made' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while updating the notification.', message: error.message });
        }
    },

    async deleteNotification(req, res) {
        const notificationId = req.params.id;
        try {
            const success = await Notification.destroy({ where: { id: notificationId } });

            if (success) {
                res.json({ message: 'Notification deleted successfully' });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while deleting the notification.' });
        }
    },

    async pushNotification() {
        // This registration token comes from the client FCM SDKs.
        const registrationToken = 'fQyI8h2-QEqPV6SNbgjIAv:APA91bGmQ_NY9vpJkAey451DNXkh_aw66U_zxKlrhHFNir1e0apuqk5Nz5K80JpGzhhA12pqMNtu-Synnm4oaH4SKnEO2LL1sudcga4e7I4U-TcDp73EpWydmlRAAJ3GbxaN9AaJ2bjM';

        const message = {
            token: registrationToken,
            notification: {
              title: 'Hi From Bakcend',
              body: 'Kawthar is talking to Zainab',
            }
          };

        // Send a message to the device corresponding to the provided
        // registration token.
        messaging.send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                res.json({ message: 'Successfully sent message', response });

            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.json({ message: error.message });
            });
    },
};

module.exports = NotificationController;
