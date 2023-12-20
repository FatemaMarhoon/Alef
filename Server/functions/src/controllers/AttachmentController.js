// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/seq');

// const Attachment = require('../models/attachment')(sequelize, DataTypes);
// const StationaryRequest = require('../models/stationary_Request')(sequelize, DataTypes);

// Attachment.belongsTo(StationaryRequest, { foreignKey: 'request_id' });
// StationaryRequest.hasMany(Attachment, { foreignKey: 'request_id' });


// const AttachmentController = {
//     async getAllAttachments(req, res) {
//         try {
//             const attachments = await Attachment.findAll({
//                 include: StationaryRequest,
//             });
//             res.json(attachments);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
// };

// module.exports = AttachmentController;