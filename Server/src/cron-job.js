const { Op, DataTypes } = require('sequelize');
const sequelize = require('./config/seq');
const Application = require('./models/preschool_application')(sequelize, DataTypes);
const Appointment = require('./models/appointment')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);
Appointment.belongsTo(Application, { foreignKey: 'application_id' });
Application.belongsTo(User, { foreignKey: 'created_by' });
const admin = require('./config/firebase.config')
const auth = admin.auth();
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
                    //   time: {
                    //       [Op.eq]: currentTime,
                    //   },
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

    }
};

module.exports = cronJob; 