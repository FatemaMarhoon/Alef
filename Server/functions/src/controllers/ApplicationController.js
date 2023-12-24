//imports
const { DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const Application = require('../models/preschool_application')(sequelize, DataTypes);
const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);
const Evaluation = require('../models/application_evaluation')(sequelize, DataTypes);
const GradesController = require('../controllers/GradeCapacityController')
const FilesManager = require('./FilesManager');
const admin = require('../config/firebase.config')
const NotificationController = require('./NotificationController');
const Payment = require('../models/payment')(sequelize, DataTypes);
//associations
Application.belongsTo(User, { foreignKey: 'created_by' });
Application.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Application.hasOne(Evaluation, { foreignKey: 'application_id' });
Preschool.hasMany(Application, { foreignKey: 'preschool_id' });


const LogsController = require('./LogController');
const UsersController = require('./UsersController');
const grade_capacity = require('../models/grade_capacity');

const ApplicationController = {
    async getAllApplications(req, res) {
        const preschool = req.query.preschool; //list applications in web 
        const user_id = req.query.user_id; //to get parent's application (Mobile App)
        try {
            //for web 
            if (preschool) {
                //normal listing 
                const applications = await Application.findAll({
                    include: [
                        { model: User },
                        { model: Evaluation }
                    ],
                    where: { preschool_id: preschool }
                });
                return res.json(applications);
            }
            //for mobile 
            else if (user_id) {
                const applications = await Application.findAll({
                    include: Preschool,
                    where: { created_by: user_id }
                });
                return res.json(applications);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createApplication(req, res) {
        const { email, preschool_id, guardian_type, status, student_name, guardian_name, student_CPR, phone, student_DOB, medical_history, created_by, gender, personal_picture, grade, certificate_of_birth, passport } = req.body;
        const application = { email, preschool_id, guardian_type, status, student_name, guardian_name, student_CPR, phone, student_DOB, medical_history, created_by, gender, grade, certificate_of_birth, passport, personal_picture };
        const user_id = await UsersController.getCurrentUser(req, res);

        try {
            if (!email) {
                return res.status(400).json({ message: "Email is required." });
            }
            if (!preschool_id) {
                return res.status(400).json({ message: "Preschool ID is required." });
            }
            if (!guardian_type) {
                return res.status(400).json({ message: "Guardian type is required." });
            }
            if (!student_name) {
                return res.status(400).json({ message: "Student name is required." });
            }
            if (!guardian_name) {
                return res.status(400).json({ message: "Guardian name is required." });
            }
            if (!student_CPR) {
                return res.status(400).json({ message: "Student CPR is required." });
            }
            if (student_CPR.length != 9) {
                return res.status(400).json({ message: "Student CPR is must be 9 digits." });
            }
            if (!phone) {
                return res.status(400).json({ message: "Phone number is required." });
            }
            if (!student_DOB) {
                return res.status(400).json({ message: "Student DOB is required." });
            }
            if (!created_by) {
                return res.status(400).json({ message: "Created By is required." });
            }
            if (!gender) {
                return res.status(400).json({ message: "Gender is required." });
            }
            if (!grade) {
                return res.status(400).json({ message: "Grade is required." });
            }
            if (!req.files['personal_picture'][0]) {
                return res.status(400).json({ message: "Personal Picture is required." });
            }
            if (!req.files['certificate_of_birth'][0]) {
                return res.status(400).json({ message: "Certificate of Birth is required." });
            }
            if (!req.files['passport'][0]) {
                return res.status(400).json({ message: "Passport is required." });
            }

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
            const capacity = await GradesController.checkGradeCapacity(preschool_id, grade);
            capacity ? application.status = "Pending" : application.status = "Waitlist";

            //create new log
            await LogsController.createLog({
                type: 'Application Creation',
                original_values: JSON.stringify(application),
                current_values: JSON.stringify(application),
                user_id: user_id
            });


            //create application
            const newApplication = await Application.create(application);
            return res.status(201).json({
                message: 'Application created successfully',
                application: newApplication,
            });
        } catch (error) {
            // Create a log entry for the error
            await LogsController.createLog({
                type: 'Error',
                original_values: JSON.stringify(application),
                current_values: JSON.stringify({ error: error.message }),
                user_id: user_id
            });
            console.log(error.message)
            return res.status(500).json({ message: error.message });
        }
    },

    async getApplicationById(req, res) {
        const { id } = req.params;
        try {
            const application = await Application.findByPk(id, {
                include: [
                    { model: User },
                    { model: Preschool },
                    { model: Evaluation },
                ]
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
        const { email, preschool_id, guardian_type, status, student_name, guardian_name, student_CPR, phone, student_DOB, medical_history, created_by, gender, personal_picture, grade, certificate_of_birth, passport } = req.body;
        const user_id = await UsersController.getCurrentUser(req, res);
        try {

            console.log("Updating")
            // Fetch the existing application
            const applicationObject = await Application.findByPk(id);
            if (applicationObject) {
                // if student with same CPR existed anywhere else, it means student have been already enrolled > prevent accepting 
                const exist = await Student.findOne({ where: { CPR: applicationObject.student_CPR } });
                if (exist && status == "Accepted") {
                    return res.status(500).json({ message: "Child already enrolled in another preschool." })
                }

                // Check and update each property individually
                if (email) applicationObject.email = email;
                if (preschool_id) applicationObject.preschool_id = preschool_id;
                if (guardian_type) applicationObject.guardian_type = guardian_type;
                if (status) applicationObject.status = status;
                if (student_name) applicationObject.student_name = student_name;
                if (guardian_name) applicationObject.guardian_name = guardian_name;
                if (student_CPR) applicationObject.student_CPR = student_CPR;
                if (phone) applicationObject.phone = phone;
                if (student_DOB) applicationObject.student_DOB = student_DOB;
                if (medical_history) applicationObject.medical_history = medical_history;
                if (created_by) applicationObject.created_by = created_by;
                if (gender) applicationObject.gender = gender;
                if (grade) applicationObject.grade = grade;

                //check for updating files 
                if (req.files['personal_picture']) {
                    const picture_url = await FilesManager.upload(req.files['personal_picture'][0]);
                    applicationObject.personal_picture = picture_url;
                }
                if (req.files['certificate_of_birth']) {
                    const certificate_of_birth_url = await FilesManager.upload(req.files['certificate_of_birth'][0]);
                    applicationObject.certificate_of_birth = certificate_of_birth_url;
                }
                if (req.files['passport']) {
                    const passport_url = await FilesManager.upload(req.files['passport'][0]);
                    applicationObject.passport = passport_url;
                }
                const originalValues = JSON.stringify(applicationObject.toJSON()); // Store the original values before the update

                // Save the updated applicationObject
                await applicationObject.save();

                const newValues = JSON.stringify(applicationObject.toJSON()); // Store the updated values after the update
                await LogsController.createLog({
                    type: 'Application Update',
                    original_values: originalValues,
                    current_values: newValues,
                    user_id: user_id
                });

                //if status updated, notify parent
                if (status) {
                    // Lookup the user associated with the application.
                    const parentUser = await User.findByPk(applicationObject.created_by);
                    if (parentUser.role_name == "Parent") {
                        let regToken;
                        //retrieve registration token and push notification 
                        console.log("User is parent")
                        await admin.auth().getUserByEmail(parentUser.email).then(async (userRecord) => {
                            regToken = userRecord.customClaims['regToken'];
                            if (regToken) {
                                console.log("Token found, trying to push")
                                if (status == "Accepted") {
                                    //send notification
                                    await NotificationController.pushSingleNotification(parentUser.email, "Congratulations!", "Your application has been accepted. Please pay any pending fees.");

                                    //subscribe to preschool topic 
                                    await NotificationController.subscribeToTopic(parentUser.email, applicationObject.preschool_id + '_Parent')

                                }
                                else {
                                    await NotificationController.pushSingleNotification(parentUser.email, "Application Updates", "Your application status has been updated.");
                                }
                            }
                            else {
                                console.log("No token")
                            }
                        });
                    }
                    //if status set to rejected, check the waiting list 
                    if (status == "Rejected" || status == "Cancelled") {
                        await GradesController.trackWaitlist(applicationObject.preschool_id, applicationObject.grade);
                    }
                    //once application has been accepted, create a student and payment record
                    else if (status == "Accepted") {
                        const creator = await User.findByPk(applicationObject.created_by);
                        const student = await Student.create({
                            preschool_id: applicationObject.preschool_id,
                            student_name: applicationObject.student_name,
                            grade: applicationObject.grade,
                            DOB: applicationObject.student_DOB,
                            CPR: applicationObject.student_CPR,
                            contact_number1: applicationObject.phone,
                            contact_number2: applicationObject.phone,
                            guardian_name: applicationObject.guardian_name,
                            enrollment_date: new Date(),
                            medical_history: applicationObject.medical_history,
                            gender: applicationObject.gender,
                            personal_picture: applicationObject.personal_picture,
                            certificate_of_birth: applicationObject.certificate_of_birth,
                            passport: applicationObject.passport,
                            user_id: creator.role_name == "Parent" ? applicationObject.created_by : null //link parent account to the student
                        })

                        const preschool = await Preschool.findByPk(applicationObject.preschool_id);
                        const payment = await Payment.create({
                            status: "Pending",
                            type: "Registration Fees",
                            fees: preschool.registration_fees,
                            due_date: new Date(),
                            notes: "Registration Fees",
                            student_id: student.id
                        });
                        return res.status(201).json({ message: 'Application Accepted and Student Registered Successfully.', student });
                    }
                }

                return res.status(200).json({ message: 'Application updated successfully.' });
            }
            else {
                return res.status(404).json({ message: 'Application not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
