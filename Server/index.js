const express = require("express");
const http = require("http");
const socketSetup = require("./src/config/socket-setup");
const cors = require("cors"); //  Import cors module
const { checkToken } = require("./src/config/token_validation");

const app = express();

//  Invoke the cors middleware
app.use(cors());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

socketSetup.initializeSocket(server);

const cron = require("node-cron");
const cronJob = require("./src/cron-job");
const backup = require("./src/backup");

// middelware
app.use(express.json());

// import routes
const userRoutes = require("./src/routes/userRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");
const classRoutes = require("./src/routes/classRoutes");
const studentEvaluationRoutes = require("./src/routes/studentEvaluationRoutes");
const AttendanceRoutes = require("./src/routes/attendanceRoutes");
const logsRoutes = require("./src/routes/logRoutes");
const plansRoute = require("./src/routes/planRoutes");
const requestRoute = require("./src/routes/requestRoutes");
const preschoolRoute = require("./src/routes/preschoolRoutes");
const appointmentRoutes = require("./src/routes/appointmentsRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const staticValuesRoutes = require("./src/routes/staticValuesRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const stationaryRoutes = require("./src/routes/stationaryRoutes");
const stationaryRequestRoutes = require("./src/routes/stationaryRequestRoutes");
const applicationEvaluationRoutes = require("./src/routes/applicationEvaluationRoutes");
const gradesRoutes = require("./src/routes/gradesRoutes");
const mediaRoutes = require("./src/routes/mediaRoutes");
const mailRoutes = require("./src/routes/mailRoutes");

// define top-level routes 
app.use("/users", userRoutes);
app.use("/applications", applicationRoutes);
app.use("/class", classRoutes);
app.use("/studentEvaluation", studentEvaluationRoutes);
app.use("/attendance", AttendanceRoutes);
app.use("/log", logsRoutes);
app.use("/plans", plansRoute);
app.use("/requests", requestRoute);
app.use("/preschools", preschoolRoute);
app.use("/appointments", appointmentRoutes);
app.use("/events", eventRoutes);
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);
app.use("/staticValues", staticValuesRoutes);
app.use("/student", studentRoutes);
app.use("/staff", staffRoutes);
app.use("/stationary", stationaryRoutes);
app.use("/stationaryRequest", stationaryRequestRoutes);
app.use("/evaluations", applicationEvaluationRoutes);
app.use("/grades", gradesRoutes);
app.use("/media", mediaRoutes);
app.use("/mail", mailRoutes);

// Schedule the cron job for reminders
cron.schedule("0,30 * * * *", cronJob.appointmentsReminder); // daily when the minutes are 0 and 30 (every half an hour)
cron.schedule("0 12 * * *", cronJob.eventsReminder); // daily at 12pm
cron.schedule("0 8 26 * *", cronJob.monthlyPaymentGenerator); // on the 26th of each month at 8 am
cron.schedule("0 8 * * *", cronJob.paymentDue); // daily at 8am

// Schedule the backup to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running the backup job...');
  backup.performBackup();
});

server.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}, at ${new Date()}`);
});