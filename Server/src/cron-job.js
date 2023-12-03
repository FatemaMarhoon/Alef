const {Op, DataTypes } = require('sequelize');
const sequelize = require('./config/seq');
const Application = require('./models/preschool_application')(sequelize, DataTypes);
const Appointment = require('./models/appointment')(sequelize, DataTypes);

const cronFunction = async () => {
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
  });
  console.log("upcoming appointments: ", upcomingAppointments)
  console.log('Appointment check complete at:', new Date());

  //logic for pushing reminders for associated users 
};

module.exports = cronFunction; 