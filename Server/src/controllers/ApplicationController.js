//imports
const { DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Evaluation = require('../models/application_evaluation')(sequelize, DataTypes);
const GradesController = require('../controllers/GradeCapacityController')
const FilesManager = require('./FilesManager');

//associations
Application.belongsTo(User, { foreignKey: 'created_by' });
Application.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Application.hasOne(Evaluation, { foreignKey: 'application_id' });
Preschool.hasMany(Application, { foreignKey: 'preschool_id' });


const ApplicationController = {
    async getAllApplications(req, res) {
        const preschool = req.query.preschool; //list applications in web 
        const status = req.query.status; //filter applications in web 
        const user_id = req.query.user_id; //to get parent's application (Mobile App)
        try {
            if (preschool) {
                if (status) {
                    const applications = await Application.findAll({
                        include: [
                            { model: User },
                            { model: Preschool},
                            { model: Evaluation },
                        ],
                        where: { preschool_id: preschool, status: status }
                    });
                    return res.json(applications);
                }
                const applications = await Application.findAll({
                    include: [
                        { model: User },
                        { model: Evaluation }
                    ],
                    where: { preschool_id: preschool }
                });
                return res.json(applications);
            }
            else if (user_id) {
                const applications = await Application.findAll({
                    include : Preschool,
                    where: { created_by : user_id}
                });
                return res.json(applications);
            }
        } catch (error) { 
            res.status(500).json({ message: error.message });
        }
    },

    async createApplication(req, res) {
        const { email, preschool_id, guardian_type, status, student_name, guardian_name,student_CPR, phone, student_DOB,medical_history, created_by, gender,personal_picture, grade, certificate_of_birth, passport } = req.body;
        const application = { email, preschool_id, guardian_type, status, student_name, guardian_name,student_CPR, phone, student_DOB,medical_history, created_by, gender, grade, certificate_of_birth, passport, personal_picture };
        try {
            //upload files
            const personal_picture = req.files['personal_picture'][0];
            const picture_url = await FilesManager.upload(personal_picture);
            application.personal_picture = picture_url;

            const certificate_of_birth = req.files['certificate_of_birth'][0];
            const certificate_url = await FilesManager.upload(certificate_of_birth);
            application.certificate_of_birth = certificate_url;

            const passport = req.files['passport'][0];
            const passport_url = await FilesManager.upload(passport);
            application.passport = passport_url;

            //set status 
            const capacity = await GradesController.checkGradeCapacity(preschool_id,grade);
            capacity ? application.status = "Pending" : application.status = "Waitlist";

            //create application
             const newApplication = await Application.create(application);
            res.status(201).json({
                message: 'Application created successfully',
                application: newApplication,
            });
        } catch (error) {
             console.log(error.message)
            res.status(400).json({ message: error.message });
        }
    },

    async getApplicationById(req, res) {
        const { id } = req.params;
        try {
            const application = await Application.findByPk(id, {
                include: Preschool
            });
            
            //generate and set urls for files 
            application.personal_picture = await FilesManager.generateSignedUrl(application.personal_picture);
            application.passport = await FilesManager.generateSignedUrl(application.passport);            
            application.certificate_of_birth = await FilesManager.generateSignedUrl(application.certificate_of_birth);

            if (!application) {
                return res.status(404).json({ message: 'Application not found.' });
            }
            res.json(application);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateApplication(req, res) {
        const { id } = req.params;
        try {
            const [updatedCount] = await Application.update(req.body, {
                where: { id }
            });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Application not found for updating.' });
            }
            res.json({ message: 'Application updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteApplication(req, res) {
        const { id } = req.params;
        try {
            const deletedCount = await Application.destroy({
                where: { id }
            });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Application not found for deletion.', message: error.message });
            }
            res.json({ message: 'Application deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ApplicationController;
