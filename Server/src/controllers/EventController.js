const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Event = require('../models/event')(sequelize, DataTypes);
const EventClass = require('../models/event_class')(sequelize, DataTypes);

Event.hasMany(EventClass, { foreignKey: 'event_id' });

const EventController = {
    async getAllEvents(req, res) {
        try {
            const events = await Event.findAll({
                include: EventClass
            });
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createEvent(req, res) {
        const eventData = req.body;
        try {
            const newEvent = await Event.create(eventData);
            res.status(201).json({
                message: 'Event created successfully',
                event: newEvent,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },


    async getEventById(req, res) {
        const { id } = req.params;
        try {
            const event = await Event.findByPk(id, {
                include: EventClass
            });
            if (!event) {
                return res.status(404).json({ message: 'Event not found.' });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while retrieving the event.' });
        }
    },

    async updateEvent(req, res) {
        const { id } = req.params;
        try {
            const [updatedCount] = await Event.update(req.body, {
                where: { id }
            });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Event not found for updating.' });
            }
            res.json({ message: 'Event updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while updating the event.', message: error.message });
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
            res.json({ message: 'Event deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while deleting the event.', message: error.message });
        }
    },
};

module.exports = EventController;
