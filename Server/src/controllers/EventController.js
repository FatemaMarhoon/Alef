const { Sequelize, DataTypes, where } = require('sequelize');
const sequelize = require('../config/seq');

const Event = require('../models/event')(sequelize, DataTypes);
const EventClass = require('../models/event_class')(sequelize, DataTypes);
const Class = require('../models/class')(sequelize, DataTypes);

// Event.hasMany(EventClass, { foreignKey: 'event_id' });
// EventClass.belongsTo(Event, { foreignKey: 'event_id' });
// Class.hasMany(EventClass, { foreignKey: 'class_id' });
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
                    where: { preschool_id: preschool_id }
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
        const { event_name, event_date, notes, public_event, classes } = req.body;
        try {
            const event = await Event.findByPk(id);

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
    },
};

module.exports = EventController;
