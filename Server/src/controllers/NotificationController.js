const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const User = require('../models/user')(sequelize, DataTypes);
const Notification = require('../models/notification')(sequelize, DataTypes);
const admin = require('../config/firebase.config')
const messaging = admin.messaging();

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

    // async pushSingleNotification(registrationToken, title, body) {
    //     const message = {
    //         token: registrationToken,
    //         notification: {
    //             title: title,
    //             body: body,
    //         }
    //     };

    //     // Send a message to the device corresponding to the provided
    //     // registration token.
    //     messaging.send(message)
    //         .then(async (response) => {
    //             // Response is a message ID string.
    //             console.log('Successfully sent message:', response);
    //             // const newNotification = await Notification.create({ notification_title: title, notification_content: body, user_id:uid});
    //         })
    //         .catch((error) => {
    //             console.log('Error sending message:', error);
    //         });
    // },

    async pushSingleNotification(email, title, body) {
        let registrationToken; let userId;
        await admin.auth().getUserByEmail(email).then((userRecord) => {
            registrationToken = userRecord.customClaims['regToken'];
            userId = userRecord.customClaims['dbId'];
        })

        console.log("Inside push notification")
        if (registrationToken){
        const message = {
            token: registrationToken,
            notification: {
                title: title,
                body: body,
            }
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        messaging.send(message)
            .then(async (response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                const response2 = await Notification.create({ notification_title: title, notification_content: body, user_id:userId});
                if (response2){
                    console.log("DB inserted")
                }
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
        }
        else {
            console.log("exitting")
            return null;
        }
    },

    async pushMultipleNotification(emails, title, body) {
        //get users objects for both id and tokens 
        let userIds = [];
        let tokens = [];
        for (const email in emails) {
            await admin.auth().getUserByEmail(email).then((userRecord) => {
                const regToken = userRecord.customClaims['regToken'];
                const userId = userRecord.customClaims['dbId'];
                userIds.push(userId);
                tokens.push(regToken);
            });
        }
        const message = {
            tokens: tokens,
            notification: {
                title: title,
                body: body,
            }
        };

        messaging.sendEachForMulticast(message)
            .then(async (response) => {
                    console.log(response.successCount + ' messages were sent successfully');

                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(tokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                }
                //generate notification records for successfully pushed notifications
                let notifications = [];
                for (const userId in userIds) {
                    const notification = { notification_title: title, notification_content: body, user_id:userId};
                    notifications.push(notification);
                }
                   await Notification.bulkCreate(notifications);

            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    },

    async pushMultipleNotification(registrationTokens, title, body) {

        const message = {
            tokens: registrationTokens,
            notification: {
                title: title,
                body: body,
            }
        };

        messaging.sendEachForMulticast(message)
            .then(async (response) => {
                console.log(response.successCount + ' messages were sent successfully');

                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                }
                //generate notification records for successfully pushed notifications
                //   await Notification.bulkCreate()
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    },



    async pushTopicNotification(topic, title, body) {
        const message = {
            topic: topic,
            notification: {
                title: title,
                body: body,
            }
        };

        // Send a message to all client devices subscribed to the specific topic
        messaging.send(message)
            .then(async (response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    },

    async setRegistrationToken(req, res) {
        const { uid, token } = req.body;
        try {
            //set regToken for firebase user
            const currentClaims = (await auth.getUser(uid)).customClaims;
            const updatedClaims = {
                ...currentClaims,
                regToken: token
            };
            await admin.auth().setCustomUserClaims(uid, updatedClaims).then(async () => {
                //get preschool to specify the topic
                await admin.auth().getUser(uid).then((userRecord) => {
                    const preschool = userRecord.customClaims['preschool_id'];
                    const role = userRecord.customClaims['role'];
                    const topic = preschool + '_' + role;
                    if (preschool) {
                        //subscribe client to topic (for preschool public notifications)
                        messaging.subscribeToTopic(registrationTokens, topic)
                            .then((response) => {
                                console.log('Successfully subscribed to topic:', response);
                            })
                            .catch((error) => {
                                console.log('Error subscribing to topic:', error);
                            });
                    }
                    return res.status(201).json({ message: 'Registration Token Stored Successfully.' });
                });
            }).catch((error) => {
                return res.status(500).json({ message: error.message });
            })
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = NotificationController;
