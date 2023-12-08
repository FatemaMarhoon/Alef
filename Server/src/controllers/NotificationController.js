const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const User = require('../models/user')(sequelize, DataTypes);
const Notification = require('../models/notification')(sequelize, DataTypes);
const admin = require('../config/firebase.config')
const messaging = admin.messaging();

const socketSetup = require('../config/socket-setup');
const EmailsManager = require('./EmailsManager');
const io = socketSetup.getIo(); // Import the io instance
const userSocketMap = socketSetup.userSocketMap;

Notification.belongsTo(User, { foreignKey: 'user_id' });

const NotificationController = {
    async getAllNotifications(req, res) {
        const user_id = req.query.user_id;
        try {
            const notifications = await Notification.findAll({
                where: { user_id: user_id }
            });
            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while retrieving notifications.' });
        }
    },

    async createNotification(req, res) {
        try {
            const notificationData = req.body;
            const newNotification = await Notification.create(notificationData);

            await pushWebNotification(notificationData.user_id, notificationData.title, notificationData.content)

            return res.status(201).json({
                message: 'Notification created successfully',
                notification: newNotification,
            });
        } catch (error) {
            res.status(400).json({ message: 'Failed to create a new notification. Please check your request data.', message: error.message });
        }
    },

    async markAllRead(req, res) {
        const user_id = req.params.id;
        try {
            const result = await Notification.update({ is_read: true }, {
                where: {user_id:user_id},
            });

            return res.status(200).json({
                message: 'All notifications set to read successfully',
                notification: result[0], //number of affected rows
            });
        } catch (error) {
            return res.status(400).json({ message: 'Failed to update notfications', message: error.message });
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

    async pushSingleNotification(email, title, body) {
        let registrationToken; let userId;
        await admin.auth().getUserByEmail(email).then((userRecord) => {
            console.log(userRecord.customClaims)
            registrationToken = userRecord.customClaims['regToken'];
            userId = userRecord.customClaims['dbId'];
        })

        console.log("Inside push notification")
        if (registrationToken) {
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
                    const response2 = await Notification.create({ title: title, content: body, user_id: userId });
                    if (response2) {
                        console.log("DB inserted")
                    }
                    return "success";
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                    return error.message;
                });
        }
        else {
            console.log("exitting")
            return null;
        }
    },

    async pushMultipleNotification(emails, title, body) {
        //get users objects for both id and tokens 
        console.log("Pushing multiple started...")
        console.log(tokens)
        let userIds = [];
        let tokens = [];
        for (const email of emails) {
            await admin.auth().getUserByEmail(email).then((userRecord) => {
                const regToken = userRecord.customClaims['regToken'];
                const userId = userRecord.customClaims['dbId'];
                if (regToken) {
                    userIds.push(userId);
                    tokens.push(regToken);
                }

            });
        }
        console.log("Tokens: ", tokens)
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
                    const notification = { title: title, content: body, user_id: userId };
                    notifications.push(notification);
                }
                await Notification.bulkCreate(notifications);

            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    },

    async subscribeToTopic(email, topic) {
        try {
            let registrationToken;
            await admin.auth().getUserByEmail(email).then((userRecord) => {
                registrationToken = userRecord.customClaims['regToken'];
            })

            messaging.subscribeToTopic(registrationToken, topic).then((response) => {
                console.log("Subscribed to Preschool: ", response)
            })

        } catch (error) {
            console.log(error.message);
        }
    },
    async pushTopicNotification(topic, title, body) {
        try {
            console.log("Started Pushing to topic")

            const message = {
                topic: topic,
                notification: {
                    title: title,
                    body: body,
                }
            };
            console.log("Message Payload: ", message)
            // Send a message to all client devices subscribed to the specific topic
            messaging.send(message)
                .then(async (response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        }
        catch (error) {
            console.log(error);
        }
    },

    async setRegistrationToken(req, res) {
        const { uid, token } = req.body;
        try {
            //set regToken for firebase user
            const currentClaims = (await admin.auth().getUser(uid)).customClaims;
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
                        messaging.subscribeToTopic(token, topic)
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
    },


};

async function pushWebNotification(user_id, title, body) {
    try {
        const targetSocketId = userSocketMap[user_id];
        //check if targeted user is connected 
        if (targetSocketId) {
            // Emit the notification only to the target user's socket
            io.to(targetSocketId).emit('notification', { title: title, body: body });
        } else {
            //if not connected, sent via email 
            console.log(`User ${user_id} is not currently connected`);
            const user = await User.findByPk(user_id);
            EmailsManager.sendNotificationEmail(user.email, user.name, title, body);
        }
    } catch (error) {
        throw error;
    }

}

module.exports = NotificationController;
