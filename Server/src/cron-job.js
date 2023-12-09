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
const Event = require('./models/event')(sequelize, DataTypes);
const Class = require('./models/class')(sequelize, DataTypes);
const EventClass = require('./models/event_class')(sequelize, DataTypes);
const Staff = require('./models/Staff')(sequelize, DataTypes);

const NotificationController = require('./controllers/NotificationController');
const EventController = require('./controllers/EventController');
//associations
Appointment.belongsTo(Application, { foreignKey: 'application_id' });
Application.belongsTo(User, { foreignKey: 'created_by' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });
Class.belongsTo(Staff, { foreignKey: 'supervisor' })
Staff.hasMany(Class, { foreignKey: 'supervisor' })
Staff.belongsTo(User, { foreignKey: 'user_id' })
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

            const title = "Upcoming Appoinment ";
            for (const appointment of upcomingAppointments) {
                const body = `Reminder: You have a scheduled appointment for applicant: ${appointment.Application.student_name} after 30 mins.`;
                if (appointment.Application.User.role_name === "Parent") {
                    const email = appointment.Application.User.email;
                    await NotificationController.pushSingleNotification(email, title, body)
                }

                //generate for admins of related preschool 
                const admins = await User.findAll({ where: { preschool_id: appointment.preschool_id, role_name: "Admin" } });
                for (const admin of admins){
                    await NotificationController.pushWebNotification(admin.id, title,body);
                }

            }


            //     //logic for pushing reminders for users (parents only)
            //     let usersEmails = [];
            //     const usersEmailsSet = new Set(
            //         upcomingAppointments
            //             //   .filter(appointment => appointment.Application.User.role_name === "Parent")
            //             .map(appointment => appointment.Application.User.email)
            //     );

            //     usersEmails = Array.from(usersEmailsSet);
            //     console.log(usersEmailsSet);

            //     let registrationTokens = [];
            //     for (const email of usersEmails) {
            //         try {
            //             const regToken = (await auth.getUserByEmail(email)).customClaims['regToken'];
            //             registrationTokens.push(regToken);
            //         } catch (error) {
            //             // Handle errors, such as the user not having a registration token
            //             console.error(`Error for email ${email}: ${error.message}`);
            //         }
            //     }
            //     console.log("Tokens: ", registrationTokens)

            //     for (const email in usersEmails){
            //         await NotificationController.pushSingleNotification()
            //     }
        }
        catch (error) {
            console.log(error.message)
        }
    },

    async eventsReminder() {
        try {
            //retrieve upcoming events (after 1 day)
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            currentDate.setDate(currentDate.getDate() + 1); // Add 30 minutes to the current time
            const upcomingEvents = await Event.findAll({
                where: {
                    event_date: {
                        [Op.gte]: currentDate, // Greater than or equal to the current date
                        [Op.lt]: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Less than the next day
                    },
                },
            });


            for (const event of upcomingEvents) {
                //notification body 
                const title = "Upcoming Event";
                const body = `This is a reminder that you have a scheduled event "${event.event_name}" for tommorrow.`;
                if (event.public_event == true) {
                    //notify all parents and teachers of that preschool (all already subscribed to topic > they're using mobile app)
                    await NotificationController.pushTopicNotification(event.preschool_id + '_Parent', title, body)
                    console.log("done from parents")
                    await NotificationController.pushTopicNotification(event.preschool_id + '_Staff', title, body)
                    console.log("done from teachers")

                    //notify web users (all staffs and admins)
                    const WebUsers = await User.findAll({
                        where: {
                            preschool_id: event.preschool_id,
                            role_name: {
                                [Op.in]: ['Admin', 'Staff'],
                            },
                        },
                    });
                    console.log("got web users: ", WebUsers.length)
                    for (const user of WebUsers) {
                        await NotificationController.pushWebNotification(user.id, title, body);
                    }
                }
                else {

                    //get related classes
                    const classIds = await EventClass.findAll({
                        where: { event_id: event.id },
                        attributes: ['class_id'],
                        raw: true,
                    });

                    // Extract class_id values into an array
                    const classes = classIds.map((classObject) => classObject.class_id);

                    //notify parents and teachers (supervisors) of event related classes only
                    const parentsEmails = await EventController.getParentsEmails(classes);
                    await NotificationController.pushMultipleNotification(parentsEmails, title, body)

                    const supervisorsEmails = await EventController.getSupervisorsEmails(classes);
                    await NotificationController.pushMultipleNotification(supervisorsEmails, title, body)
                }

            }
        } catch (error) {
            console.log(error)
        }
    },


    async monthlyPaymentGenerator() {
        //loop through all preschools and generate payment record for all students 
        try {
            console.log("Job started at: ", new Date());
            const preschools = await Preschool.findAll({ include: { model: Student, as: "Students", include: { model: User, as: "User" } } });
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
        catch (error) {
            console.log(error.message)
        }
    }
};

module.exports = cronJob; 