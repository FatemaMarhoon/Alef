const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Media = require('../models/preschool_media')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');
const { getCurrentUser, getCurrentUserRole } = require('./UsersController');
const { verifyPreschool } = require('../config/token_validation');

Preschool.hasMany(Media, { foreignKey: 'preschool_id' });
Media.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const MediaController = {

    async getAllMedia(req, res) {
        const preschool = req.query.preschool_id;
        try {
            if (preschool) {
                const media = await Media.findAll({
                    where: {
                        preschool_id: preschool
                    }
                });
                // Replace file field with file URL in each media object
                const mediaWithUrls = await Promise.all(media.map(async (mediaObj) => {
                    const fileURL = await FilesManager.generateSignedUrl(mediaObj.file);
                    return { ...mediaObj.toJSON(), file: fileURL };
                }));

                return res.status(200).json(mediaWithUrls);
            }
            else {
                return res.status(400).json({ message: 'Please specify preschool id in the query parameter.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async uploadMedia(req, res) {
        const { preschool_id } = req.body;
        const files = req.files;
        try {
            // access control 
            if (await getCurrentUserRole(req) == "Admin") {
                if (await verifyPreschool(preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
            }

            let mediaObjects = [];
            if (files.length > 0) {
                for (const file of files) {
                    //upload and insert record for each file 
                    const file_name = await FilesManager.upload(file)
                    mediaObjects.push({ preschool_id: preschool_id, file: file_name });
                }
                const added = await Media.bulkCreate(mediaObjects);
                if (added) {
                    return res.status(201).json({ message: "Media Uploaded Successfully." });
                }
                else {
                    return res.status(201).json({ message: "Media Upload Failed." });
                }
            }
            else {
                return res.status(404).json({ message: "No Files Found For Upload." });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async deleteMedia(req, res) {
        const mediaId = req.params.id;
        try {
            const media = await Media.findByPk(mediaId);
            // access control 
            if (await getCurrentUserRole(req) == "Admin") {
                if (await verifyPreschool(media.preschool_id, req) == false) {
                    return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                }
            }

            const success = await Media.destroy({ where: { id: mediaId } });

            if (success) {
                return res.json({ message: 'Media deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Media not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async deleteMultipleMedia(req, res) {
        const { mediaIds } = req.body;
        try {
            const mediaObjects = await Media.findAll({
                where: {
                    id: {
                        [Op.in]: mediaIds,
                    },
                },
            });

            for (const media of mediaObjects) {
                // access control (validate that all media belongs to the user who's trying to update)
                if (await getCurrentUserRole(req) == "Admin") {
                    if (await verifyPreschool(media.preschool_id, req) == false) {
                        return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
                    }
                }
            }

            const deletedRows = await Media.destroy({
                where: {
                    id: {
                        [Op.in]: mediaIds,
                    },
                },
            });

            if (deletedRows > 0) {
                return res.json({ message: 'Media deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Media not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

};

module.exports = MediaController;
