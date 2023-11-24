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
    // async getAllEvents(req, res) {
    //     try {
    //         const events = await Event.findAll({
    //             include: EventClass
    //         });
    //         res.json(events);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    async getAllEvents(req, res) {
        const class_id = req.query.class_id; 
        const preschool_id = req.query.preschool_id;
        try {
            if (class_id) {
                const classObject = await Class.findAll({
                    where: {id:class_id},
                    include: [
                        { model: Event, as: "Events" },
                    ],
                });
                const classDetails = classObject[0].dataValues;
                const events = classDetails.Events;
            
                return res.status(201).json({
                  events
                });
            }
            else if (preschool_id) {

            }
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async getEventsByPreschoolId(req, res) {
        const preschool_id = req.query.preschool_id;
      
        try {
          const classObjects = await Class.findAll({
            where: { preschool_id: preschool_id },
            include: [
              {
                model: Event,
                as: 'Events',
              },
            ],
          });
      
          const groupedEvents = {};
      
          for (const classObject of classObjects) {
            const classDetails = classObject.dataValues;
            const events = classDetails.Events;
      
            groupedEvents[classDetails.id] = {
              events,
            };
          }
      
          return res.status(201).json(groupedEvents);
        } catch (error) {
          return res.status(500).json({ message: error.message });
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
            const event = await Event.findByPk(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found.' });
            }
            return res.status(201).json(event);
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
