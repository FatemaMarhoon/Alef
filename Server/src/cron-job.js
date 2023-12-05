const { Op, DataTypes } = require('sequelize');
const sequelize = require('./config/seq');
const admin = require('./config/firebase.config');
const auth = admin.auth();
//models
const Application = require('./models/preschool_application')(sequelize, DataTypes);
const Appointment = require('./models/appointment')(sequelize, DataTypes);
const Preschool = require('./models/preschool')(sequelize, DataTypes);
const Student = require('./models/student')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);
const Payment = require('./models/payment')(sequelize, DataTypes);

const NotificationController = require('./controllers/NotificationController');

//associations
Appointment.belongsTo(Application, { foreignKey: 'application_id' });
Application.belongsTo(User, { foreignKey: 'created_by' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });

const cronJob = {
    async appointmentsReminder() {
        try {
            // retrieve any appointment that should occur after 30 min 
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            let currentTime = new Date();
            currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes to the current time
            currentTime.setSeconds(0); //set seconds to 0
            currentTime = currentTime.toLocaleString('en-GB', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
            const upcomingAppointments = await Appointment.findAll({
                where: {
                    date: {
                        [Op.eq]: currentDate.toLocaleDateString(),
                    },
                      time: {
                          [Op.eq]: currentTime,
                      },
                },
                include: [{ model: Application, as: "Application", include: [{ model: User, as: "User" }] }]
            });
            // console.log("upcoming appointments: ", upcomingAppointments)
            // console.log('Appointment check complete at:', new Date());

            //logic for pushing reminders for users (parents only)
            let usersEmails = [];
            const usersEmailsSet = new Set(
                upcomingAppointments
                    //   .filter(appointment => appointment.Application.User.role_name === "Parent")
                    .map(appointment => appointment.Application.User.email)
            );


            usersEmails = Array.from(usersEmailsSet);
            console.log(usersEmailsSet);

            let registrationTokens = [];
            for (const email of usersEmails) {
                try {
                    const regToken = (await auth.getUserByEmail(email)).customClaims['regToken'];
                    registrationTokens.push(regToken);
                } catch (error) {
                    // Handle errors, such as the user not having a registration token
                    console.error(`Error for email ${email}: ${error.message}`);
                }
            }
            console.log("Tokens: ", registrationTokens)
        }
        catch (error) {
            console.log(error.message)
        }
    },

    async eventsReminder() {

    },

    async monthlyPaymentGenerator() {
        //loop through all preschools and generate payment record for all students 
        try {
        console.log("Job started at: ", new Date());
        const preschools = await Preschool.findAll({ include: { model: Student, as: "Students", include: { model: User, as: "User" } }});
        for (const preschool of preschools) {
            console.log("Looping")
            if (preschool.Students.length > 0) {
                console.log("Looping through students:", preschool.Students.length)
                for (const student of preschool.Students) {
                    const paymentData = { fees: preschool.monthly_fees, type: "Monthly Fees", student_id: student.id, due_date: new Date(), status: "Pending" }
                    paymentData.due_date.setDate(paymentData.due_date.getDate() + 7)
                    const newPayment = await Payment.create(paymentData);
                    if (newPayment && student.User) {
                        if (student.User.role_name == "Parent") {
                            const title = "Monthly Fees Payment Reminder"
                            const body = `Dear Parent, payment is open now for monthly fees. Make sure to pay before ${paymentData.due_date.toLocaleDateString()}`;
                            await NotificationController.pushSingleNotification(student.User.email, title, body);
                        }
                    }
                }
            }
            
        }
    }
    catch (error){
        console.log(error.message)
    }
    }
};

module.exports = cronJob; 