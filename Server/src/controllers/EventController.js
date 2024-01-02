const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/seq');
const admin = require('../config/firebase.config')
const auth = admin.auth();

const Event = require('../models/event')(sequelize, DataTypes);
const EventClass = require('../models/event_class')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);
const Staff = require('../models/staff')(sequelize, DataTypes);
const NotificationController = require('./NotificationController');
const { verifyPreschool } = require('../config/token_validation');
const UsersController = require('./UsersController');
Class.hasMany(Student, { foreignKey: 'class_id' });
Student.belongsTo(Class, { foreignKey: 'class_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Class.belongsTo(Staff, { foreignKey: 'supervisor' })
Staff.hasMany(Class, { foreignKey: 'supervisor' })
Staff.belongsTo(User, { foreignKey: 'user_id' })

// Define the many-to-many relationships
Event.belongsToMany(Class, {
    through: EventClass,
    foreignKey: 'event_id',
    as: 'Classes',
});

Class.belongsToMany(Event, {
    through: EventClass,
    foreignKey: 'class_id',
    as: 'Events',
});

const EventController = {

    //by class id or by preschool id
    async getAllEvents(req, res) {
        let events;
        const class_id = req.query.class_id;
        const preschool_id = req.query.preschool_id;
        try {
            if (class_id) {
                const classObject = await Class.findOne({
                    where: { id: class_id },
                    include: [
                        { model: Event, as: "Events" },
                    ],
                });

                if (classObject) {

                    // access control (trying to access events from class of another preschool)
                    if (await verifyPreschool(classObject.preschool_id, req) != true) {
                        return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                    }

                    events = classObject.Events;
                    const publicEvents = await Event.findAll({
                        where: { public_event: true, preschool_id: classObject.preschool_id },
                    });

                    events = events.concat(publicEvents);
                }
                else {
                    return res.status(404).json({ message: 'Class not found.' });
                }

            }
            else if (preschool_id) {
                // access control (trying to access events from another preschool)
                if (await verifyPreschool(preschool_id, req) != true) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
                events = await Event.findAll(({
                    where: { preschool_id: preschool_id },
                    include: [{ model: Class, as: "Classes" }]
                }));

                if (!events) {
                    return res.status(404).json({ message: 'No events found.' });
                }
            }
            return res.status(200).json({ events });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async createEvent(req, res) {
        var { event_name, event_date, notes, notify_parents, notify_staff, public_event, created_by, preschool_id, classes, } = req.body;
        try {
            // access control
            const currentRole = await UsersController.getCurrentUserRole(req);
            if (currentRole == 'Parent' || currentRole == 'Super Admin') {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }
            else if (await verifyPreschool(preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            if (!event_name) {
                return res.status(400).json({ message: "Event Name is Required" });
            }

            if (!event_date) {
                return res.status(400).json({ message: "Event Date is Required" });
            }

            if (!created_by) {
                return res.status(400).json({ message: "User Id is Required" });
            }

            if (!preschool_id) {
                return res.status(400).json({ message: "Preschool Id is Required" });
            }

            if (public_event == false && classes.length == 0) {
                return res.status(400).json({ message: "Classes are Required When It's not a Public Event" });
            }

            // Dates formatting
            let selectedDate = new Date(event_date);
            selectedDate.setHours(0, 0, 0, 0); // Set the time value of the date to 00:00:00
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison

            // If date is in the past or today, return error message
            if (selectedDate <= currentDate) {
                return res.status(400).json({ message: 'Please select a date in the future.' });
            }
            const newEvent = await Event.create({ event_name, event_date, notes, created_by, notify_parents, notify_staff, public_event, preschool_id });

            if (classes && classes.length) {
                const eventClassBulkData = [];
                for (const classId of classes) {
                    eventClassBulkData.push({
                        class_id: classId,
                        event_id: newEvent.id,
                    });
                }
                await EventClass.bulkCreate(eventClassBulkData);
            }

            //format date for display in body 
            const options = {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            };

            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(event_date));

            const title = 'New Event Added !';
            const body = `Don't miss out on: ${event_name} scheduled on ${formattedDate}. Check it out now!`;

            if (notify_parents == true) {
                //notify all parents (previously subscribed to the topic)
                if (public_event == true) {
                    NotificationController.pushTopicNotification(preschool_id + '_Parent', title, body)
                }
                else {
                    //notify parents of students in those classes 
                    const emails = await getParentsEmails(classes);
                    if (emails.length > 0) {
                        for (const email of emails) {
                            await NotificationController.pushSingleNotification(email, title, body)
                        }
                    }

                }
            }

            if (notify_staff == true) {
                //notify all teachers (previously subscribed to the topic) & web users 
                if (public_event == true) {
                    await NotificationController.pushTopicNotification(preschool_id + '_Teacher', title, body)

                    const WebUsers = await User.findAll({
                        where: {
                            preschool_id: preschool_id,
                            role_name: {
                                [Op.in]: ['Admin', 'Staff'],
                            },
                        },
                    });
                    for (const user of WebUsers) {
                        await NotificationController.pushWebNotification(user.id, title, body);
                    }
                }
                //notify classes supervisors only
                else {
                    const emails = await getSupervisorsEmails(classes);
                    if (emails.length > 0) {
                        for (const email of emails) {
                            await NotificationController.pushSingleNotification(email, title, body)
                        }
                    }

                }
            }

            return res.status(201).json({
                message: 'Event created successfully',
                event: newEvent,
            });
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ message: error.message });
        }
    },

    async getEventById(req, res) {
        const { id } = req.params;
        try {
            const event = await Event.findOne({
                where: { id: id },
                include: { model: Class, as: "Classes" },
            });

            if (!event) {
                return res.status(404).json({ message: 'Event not found.' });
            }
            // access control
            if (await verifyPreschool(event.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }
            else {
                return res.status(200).json(event);
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while retrieving the event.' });
        }
    },

    async updateEvent(req, res) {
        const { id } = req.params;
        var {
            event_name,
            event_date,
            notes,
            public_event,
            notify_staff,
            notify_parents,
            classes,
        } = req.body;
        try {
            const event = await Event.findByPk(id);
            // access control
            if (await verifyPreschool(event.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            if (event) {
                if (public_event == false && classes.length == 0) {
                    return res.status(400).json({ message: "Classes are Required When It's not a Public Event" });
                }
                if (event_name) event.event_name = event_name;
                if (event_date) event.event_date = event_date;
                if (notes) event.notes = notes;
                if (public_event != undefined) event.public_event = public_event;
                if (notify_parents != undefined) event.notify_parents = notify_parents;
                if (notify_staff != undefined) event.notify_staff = notify_staff;

                if (classes && classes.length) {
                    //remove existing records in EventClass 
                    await EventClass.destroy({
                        where: { event_id: event.id },
                    });
                    //insert new records
                    const eventClassBulkData = [];
                    for (const classId of classes) {
                        eventClassBulkData.push({ class_id: classId, event_id: event.id });
                    }
                    await EventClass.bulkCreate(eventClassBulkData);
                }

                if (public_event == true) {
                    //make sure to remove any previous records if any 
                    await EventClass.destroy({
                        where: { event_id: event.id },
                    });
                }
                // Save the updated event
                await event.save();


                //notifications
                const title = 'Event Updates!';
                const body = `There are some updates regarding ${event_name} event. Check it out now!`;
                if (event.notify_parents == true) {
                    //notify all teachers (let them subscribe to topics)
                    if (event.public_event == true) {
                        NotificationController.pushTopicNotification(event.preschool_id + '_Parent', title, body)
                    }
                    else {
                        //notify parents of students in those classes 
                        const emails = getParentsEmails(classes);
                        if (emails.length > 0) {
                            for (const email of emails) {
                                await NotificationController.pushSingleNotification(email, title, body)
                            }
                        }
                    }
                }

                if (event.notify_staff == true) {
                    if (event.public_event == true) {
                        //notify all teachers (let them subscribe to topics)
                        NotificationController.pushTopicNotification(event.preschool_id + '_Staff')

                        //notify all web users 
                        const WebUsers = await User.findAll({
                            where: {
                                preschool_id: event.preschool_id,
                                role_name: {
                                    [Op.in]: ['Admin', 'Staff'],
                                },
                            },
                        });
                        for (const user of WebUsers) {
                            await NotificationController.pushWebNotification(user.id, title, body);
                        }
                    }
                    //notify classes supervisors only
                    else {
                        const emails = getSupervisorsEmails(classes);
                        if (emails.length > 0) {
                            for (const email of emails) {
                                await NotificationController.pushSingleNotification(email, title, body)
                            }
                        }

                    }
                }
                return res.status(200).json({ message: 'Event updated successfully.' });
            }
            else {
                return res.status(404).json({ message: 'Event not found for updating.' });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error while updating the event.', message: error.message });
        }
    },

    async deleteEvent(req, res) {
        const { id } = req.params;
        try {
            const event = await Event.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found for deletion.' });
            }
            // access control 
            if (await verifyPreschool(event.preschool_id, req) == false) {
                return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
            }

            const deletedCount = await Event.destroy({
                where: { id }
            });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Event not found for deletion.' });
            }
            return res.status(200).json({ message: 'Event deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while deleting the event.', message: error.message });
        }
    },



};

async function getParentsEmails(classes) {
    try {
        let studentEmails = [];

        if (classes && classes.length > 0) {
            // Find all students in the specified classes
            const students = await Student.findAll({
                where: { class_id: { [Op.in]: classes }, user_id: { [Op.not]: null } },
                include: [
                    { model: Class, as: "Class" }, { model: User, as: "User" }
                ],
            });
            // Extract associated user email from each student and add to 
            studentEmails = students.map(student => student.User.email);
        }

        return studentEmails;

    }
    catch (error) {
        throw error;
    }
}

async function getSupervisorsEmails(classes) {
    try {
        let supervisorsEmails = [];
        if (classes && classes.length > 0) {
            // Find all students in the specified classes
            const classList = await Class.findAll({
                where: { id: { [Op.in]: classes } },
                include: [
                    {
                        model: Staff, as: 'Staff',
                        distinct: true,
                        include: [{ model: User, as: 'User' }]
                    }
                ],
            });
            // Extract associated user email from each student and add to 
            const user = classObject.Staff.User;
            if (user) {
                const supervisorsEmailsSet = new Set(classList.map(classObject => classObject.Staff.User.email));
                supervisorsEmails = Array.from(supervisorsEmailsSet);
            }

        }
        return supervisorsEmails;

    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    EventController,
    getParentsEmails,
    getSupervisorsEmails,
};