const { Op, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const Media = require('../models/preschool_media')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');

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
                return res.status(200).json(media);
            }
            else {
                return res.status(400).json({ message: 'Please specify preschool id in the query parameter.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateMedia(req, res) {
        const mediaData = req.body;
        const files = req.files['files']
        try {
            let mediaObjects = [];
            if (files.length > 0 ){
                for (const file of files){
                    //upload and insert record for each file 
                    const file_name = await FilesManager.upload(file)
                    mediaObjects.push({preschool_id:mediaData.preschool_id, file:file_name});
                }
                const added = await Media.bulkCreate(mediaObjects);
                if (added) {
                    return res.status(201).json({ message: "Media Uploaded Successfully."});
                }
                else {
                    return res.status(201).json({ message: "Media Upload Failed."});   
                }
            }
            else {
                return res.status(404).json({ message: "No Files Found For Upload."});
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async deleteMedia(req, res) {

    }


};

module.exports = MediaController;
