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
const Staff = require('./models/staff')(sequelize, DataTypes);

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
Payment.belongsTo(Student, { foreignKey: 'student_id' })

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
            console.log("CRON JOB APPOINTMENT REMINDER STARTED AT: ", new Date());
           
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison

            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 1); // Set the next day for the upper bound

            let currentTime = new Date();
            currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes to the current time
            currentTime.setSeconds(0); //set seconds to 0
            currentTime = currentTime.toLocaleTimeString('en-GB', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
            console.log('current time used for comparison: ', currentTime)
            
            const upcomingAppointments = await Appointment.findAll({
                where: {
                    date: {
                        [Op.gte]: currentDate,
                        [Op.lt]: nextDate,
                    },
                    time: {
                        [Op.eq]: currentTime,
                    },
                },
                include: [{ model: Application, as: "Application", include: [{ model: User, as: "User" }] }]
            });

            console.log(upcomingAppointments.length, " appointments found");
            const title = "Upcoming Appoinment ";
            for (const appointment of upcomingAppointments) {
                const body = `Reminder: You have a scheduled appointment for applicant: ${appointment.Application.student_name} after 30 mins.`;
                if (appointment.Application.User.role_name === "Parent") {
                    const email = appointment.Application.User.email;
                    await NotificationController.pushSingleNotification(email, title, body)
                }

                //generate for admins of related preschool 
                const admins = await User.findAll({ where: { preschool_id: appointment.preschool_id, role_name: "Admin" } });
                for (const admin of admins) {
                    await NotificationController.pushWebNotification(admin.id, title, body);
                }
            }
        }
        catch (error) {
            console.log(error.message)
        }
    },

    async eventsReminder() {
        try {
            console.log("CRON JOB EVENT REMINDER STARTED AT: ", new Date());
            //retrieve upcoming events (after 1 day)
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison
            currentDate.setDate(currentDate.getDate() + 1); // Add 1 day to the current date
            const upcomingEvents = await Event.findAll({
                where: {
                    event_date: {
                        [Op.gte]: currentDate, // Greater than or equal to the current date
                        [Op.lt]: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Less than the next day
                    },
                },
            });

            console.log(upcomingEvents.length, " events found.")
            for (const event of upcomingEvents) {
                //notification body 
                const title = "Upcoming Event";
                const body = `This is a reminder that you have a scheduled event "${event.event_name}" for tommorrow.`;
                if (event.public_event == true) {
                    //notify all parents and teachers of that preschool (all already subscribed to topic > they're using mobile app)
                    await NotificationController.pushTopicNotification(event.preschool_id + '_Parent', title, body)
                    console.log("done sending public event reminder to all parents")
                    await NotificationController.pushTopicNotification(event.preschool_id + '_Teacher', title, body)
                    console.log("done sending public event reminder to all teachers")

                    //notify web users (all staffs and admins)
                    const WebUsers = await User.findAll({
                        where: {
                            preschool_id: event.preschool_id,
                            role_name: {
                                [Op.in]: ['Admin', 'Staff'],
                            },
                        },
                    });
                    for (const user of WebUsers) {
                        await NotificationController.pushWebNotification(user.id, title, body);
                    }
                    console.log("done sending public event reminder to all web users")
                }
                else {
                    const classIds = await EventClass.findAll({    //get related classes
                        where: { event_id: event.id },
                        attributes: ['class_id'],
                        raw: true,
                    });

                    // Extract class_id values into an array
                    const classes = classIds.map((classObject) => classObject.class_id);

                    //notify parents and teachers (supervisors) of event related classes only
                    const parentsEmails = await EventController.getParentsEmails(classes);
                    const supervisorsEmails = await EventController.getSupervisorsEmails(classes);
                    for (const email of parentsEmails) {
                        await NotificationController.pushSingleNotification(email, title, body)
                    }
                    console.log("done sending class-specific reminder to all related parents")
                    for (const email of supervisorsEmails) {
                        await NotificationController.pushSingleNotification(email, title, body)
                    }
                    console.log("done sending class-specific reminder to all related supervisors")

                }
            }
        } catch (error) {
            console.log(error)
        }
    },

    async monthlyPaymentGenerator() {
        //loop through all preschools and generate payment record for all students 
        try {
            console.log("CRON JOB PAYMENT GENERATOR STARTED AT: ", new Date());
            const preschools = await Preschool.findAll({ include: { model: Student, as: "Students", include: { model: User, as: "User" } } });
            for (const preschool of preschools) {
                if (preschool.Students.length > 0) {
                    for (const student of preschool.Students) {
                        const paymentData = {
                            fees: preschool.monthly_fees, type: "Monthly Fees", student_id: student.id, due_date: new Date(),
                            status: "Pending"
                        }
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
    },

    // change status to overdue when due date arrive 
    async paymentDue() {
        try {
            console.log("CRON JOB PAYMENT DUE STARTED AT: ", new Date());

            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison

            // retrive payment records to be changed to overdue, to notify parents 
            const paymentRecords = await Payment.findAll(
                {
                    where: {
                        status: 'Pending',
                        due_date: {
                            [Op.eq]: currentDate,
                        },
                    },
                    include: [{ model: Student, as: "Student", include: [{ model: User, as: "User" }] }]
                }
            );

            // update all payment records that are still unpaid and the due date is today 
            await Payment.update(
                { status: 'Overdue' },
                {
                    where: {
                        status: 'Pending',
                        due_date: {
                            [Op.eq]: currentDate,
                        },
                    },
                }
            );

            // notify parents 
            for (const record of paymentRecords) {
                // if student has a parent account, notify 
                if (record.Student.User) {
                    const email = record.Student.User.email;
                    const title = "Overdue Payment";
                    const body = `${record.type} is now overdue. Please settle it promptly. Thank you!`;
                    await NotificationController.pushSingleNotification(email, title, body);
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }
};

module.exports = cronJob; 