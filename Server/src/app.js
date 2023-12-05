//create app 
const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const cron = require('node-cron');
const cronJob = require('./cron-job'); 


//imports
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const attachementRoutes = require('./routes/attachementRoutes');
const classRoutes = require('./routes/classRoutes');
const studentEvaluationRoutes = require('./routes/studentEvaluationRoutes');
const AttendanceRoutes = require('./routes/attendanceRoutes');
const logsRoutes = require('./routes/logRoutes');
const ReportRoutes = require('./routes/reportRoutes');
const plansRoute = require('./routes/planRoutes');
const requestRoute = require('./routes/requestRoutes');
const preschoolRoute = require('./routes/preschoolRoutes');
const appointmentRoutes = require('./routes/appointmentsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const staticValuesRoutes = require('./routes/staticValuesRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const stationaryRoutes = require('./routes/stationaryRoutes');
const stationaryRequestRoutes = require('./routes/stationaryRequestRoutes');
const applicationEvaluationRoutes = require('./routes/applicationEvaluationRoutes');
const gradesRoutes = require('./routes/gradesRoutes');


//middelware
app.use(express.json());
app.use(cors());


//routes
app.use('/users', userRoutes);
app.use('/applications', applicationRoutes);
app.use('/attachement', attachementRoutes);
app.use('/class', classRoutes);
app.use('/studentEvaluation', studentEvaluationRoutes);
app.use('/attendance', AttendanceRoutes);
app.use('/log', logsRoutes);
app.use('/report', ReportRoutes);
app.use('/plans', plansRoute);
app.use('/requests', requestRoute);
app.use('/preschools', preschoolRoute);
app.use('/appointments', appointmentRoutes);
app.use('/events', eventRoutes);
app.use('/notifications', notificationRoutes);
app.use('/payments', paymentRoutes);
app.use('/staticValues', staticValuesRoutes);
app.use('/student', studentRoutes);
app.use('/staff', staffRoutes);
app.use('/stationary', stationaryRoutes);
app.use('/stationaryRequest', stationaryRequestRoutes);
app.use('/evaluations', applicationEvaluationRoutes);
app.use('/grades', gradesRoutes);


//schedule the cron job for reminders
cron.schedule('0,30 * * * *', cronJob.appointmentsReminder); //daily when the minutes are 0 and 30 (every half an hour)
cron.schedule('0 12 * * *', cronJob.eventsReminder); //daily at 12pm
cron.schedule('* 8 26 * *', cronJob.monthlyPaymentGenerator); //on the 26th of each month at 8 am

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
