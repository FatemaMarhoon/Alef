const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/seq');

const Event = require('../models/event')(sequelize, DataTypes);
const EventClass = require('../models/event_class')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);
const Staff = require('../models/staff')(sequelize, DataTypes);
const NotificationController = require('./NotificationController');
// Event.hasMany(EventClass, { foreignKey: 'event_id' });
// EventClass.belongsTo(Event, { foreignKey: 'event_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });
Student.belongsTo(Class, { foreignKey: 'class_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Class.belongsTo(Staff, { foreignKey: 'supervisor' })
Staff.hasMany(Class, { foreignKey: 'supervisor' })
// EventClass.belongsTo(Class, { foreignKey: 'class_id' });

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
                const classObject = await Class.findAll({
                    where: { id: class_id },
                    include: [
                        { model: Event, as: "Events" },
                    ],
                });
                if (classObject) {
                    const classDetails = classObject[0].dataValues;
                    events = classDetails.Events;
                }
                else {
                    return res.status(404).json({ message: 'Class not found.' });
                }
            }
            else if (preschool_id) {
                events = await Event.findAll(({
                    where: { preschool_id: preschool_id },
                    include:[{ model:Class, as: "Classes"}]
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
        var {
            event_name,
            event_date,
            notes,
            notify_parents,
            notify_staff,
            public_event,
            created_by,
            preschool_id,
            classes,
        } = req.body;

        try {

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

            const newEvent = await Event.create({
                event_name,
                event_date,
                notes,
                created_by,
                notify_parents,
                notify_staff,
                public_event,
                preschool_id,
            });

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
            const title = 'New Event Added !';
            const body = `Don't miss out on the upcoming event: ${event_name} on ${event_date}. Check it out now!`;
            if (notify_parents == true) {
                //notify all teachers (let them subscribe to topics)
                if (public_event == true) {
                    NotificationController.pushTopicNotification(preschool_id + '_Parent', title, body)
                }
                else {
                    //notify parents of students in those classes 
                    const tokens = getParentsTokens(classes);
                    NotificationController.pushMultipleNotification(tokens, title, body)
                }
            }

            if (notify_staff == true) {
                //notify all teachers (let them subscribe to topics)
                if (public_event == true) {
                    NotificationController.pushTopicNotification(preschool_id + '_Staff')
                }
                //notify classes supervisors only
                else {
                    const tokens = getSupervisorsTokens(classes);
                    NotificationController.pushMultipleNotification(tokens, title, body)
                }
            }

            return res.status(201).json({
                message: 'Event created successfully',
                event: newEvent,
            });
        } catch (error) {
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
            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while retrieving the event.' });
        }
    },

    async updateEvent(req, res) {
        const { id } = req.params;
        const {
            event_name,
            event_date,
            notes,
            notify_parents,
            notify_staff,
            public_event,
            classes,
        } = req.body;
        try {
            const event = await Event.findByPk(id);
            if (public_event == false && classes.length == 0) {
                return res.status(400).json({ message: "Classes are Required When It's not a Public Event" });
            }

            if (event) {
                if (event_name) event.event_name = event_name;
                if (event_date) event.event_date = event_date;
                if (notes) event.notes = notes;
                if (public_event) event.public_event = public_event;

                if (classes && classes.length) {
                    //remove existing records in EventClass 
                    await EventClass.destroy({
                        where: { event_id: event.id },
                    });

                    //insert new records
                    const eventClassBulkData = [];
                    for (const classId of classes) {
                        eventClassBulkData.push({
                            class_id: classId,
                            event_id: event.id,
                        });
                    }
                    await EventClass.bulkCreate(eventClassBulkData);
                }
                // Save the updated event
                await event.save();


                //notifications
                const title = 'Event Updates !';
                const body = `There are some updated regarding ${event_name}. Check it out now!`;
                // if (notify_parents == true) {
                //     //notify all teachers (let them subscribe to topics)
                //     if (public_event == true) {
                //         NotificationController.pushTopicNotification(preschool_id + '_Parent', title, body)
                //     }
                //     else {
                //         //notify parents of students in those classes 
                //         const tokens = getParentsTokens(classes);
                //         NotificationController.pushMultipleNotification(tokens, title, body)
                //     }
                // }

                // if (notify_staff == true) {
                //     //notify all teachers (let them subscribe to topics)
                //     if (public_event == true) {
                //         NotificationController.pushTopicNotification(preschool_id + '_Staff')
                //     }
                //     //notify classes supervisors only
                //     else {
                //         const tokens = getSupervisorsTokens(classes);
                //         NotificationController.pushMultipleNotification(tokens, title, body)
                //     }
                // }
                return res.status(200).json({ message: 'Event updated successfully.' });
            }
            else {
                return res.status(404).json({ message: 'Event not found for updating.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while updating the event.', message: error.message });
        }
    },

    async deleteEvent(req, res) {
        const { id } = req.params;
        try {
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
    }

};

async function getParentsTokens(classes) {
    try {
        let studentEmails = [];

        if (classes && classes.length > 0) {
            // Find all students in the specified classes
            const students = await Student.findAll({
                where: { class_id: { [Op.in]: classes }, user_id: { [Op.not]: null } },
                include: [
                    { model: Class }, { model: User }
                ],
            });
            // Extract associated user email from each student and add to 
            studentEmails = students.map(student => student.User.email);
        }

        for (const email of studentEmails) {
            try {
                const regToken = (await auth.getUserByEmail(email)).customClaims['regToken'];
                registrationTokens.push({ email, regToken });
            } catch (error) {
                // Handle errors, such as the user not having a registration token
                console.error(`Error for email ${email}: ${error.message}`);
            }
        }
        return registrationTokens;

    }
    catch (error) {
        throw error;
    }
}

async function getSupervisorsTokens(classes) {
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
                    }
                ],
            });
            // Extract associated user email from each student and add to 
            const supervisorsEmailsSet = new Set(classList.map(classObject => classObject.Staff.email));
            supervisorsEmails = Array.from(supervisorsEmailsSet);
        }

        for (const email of supervisorsEmails) {
            try {
                const regToken = (await auth.getUserByEmail(email)).customClaims['regToken'];
                registrationTokens.push({ email, regToken });
            } catch (error) {
                // Handle errors, such as the user not having a registration token
                console.error(`Error for email ${email}: ${error.message}`);
            }
        }
        return registrationTokens;
    }
    catch (error) {
        throw error;
    }
}

module.exports = EventController;
