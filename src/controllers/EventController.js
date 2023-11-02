const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Event = require('../models/event')(sequelize, DataTypes);
// const Class = require('../models/class')(sequelize, DataTypes);
const EventClass = require('../models/event_class')(sequelize, DataTypes);


Event.hasMany(EventClass,  { foreignKey: 'event_id' });

const EventController = {
    async getAllEvents(req, res) {
        try {
            const events = await Event.findAll(
                {
                    include: EventClass
                }
            ); 
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = EventController;