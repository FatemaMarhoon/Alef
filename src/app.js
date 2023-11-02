//create app 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//imports
const userRoutes = require('./routes');
const applicationRoutes = require('./routes/applicationRoutes');
// const plansRoute = require('./routes/plansRoutes');
const requestRoute = require('./routes/requestRoutes');
const preschoolRoute = require('./routes/preschoolRoutes');
const appointmentRoutes = require('./routes/appointmentsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const staticValuesRoutes = require('./routes/staticValuesRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const staffRoutes = require('./routes/staffRoutes');
// const stationaryRoutes = require('./routes/stationaryRoutes');
// const stationaryRequestRoutes = require('./routes/stationaryRequestRoutes');


//middelware
app.use(express.json());

//routes
app.use('/users', userRoutes);
app.use('/applications', applicationRoutes);
// app.use('/plans', plansRoute);
app.use('/requests', requestRoute);
app.use('/preschools', preschoolRoute);
app.use('/appointments', appointmentRoutes);
app.use('/events', eventRoutes);
app.use('/notifications', notificationRoutes);
app.use('/payments', paymentRoutes);
app.use('/staticValues', staticValuesRoutes);
// app.use('/student', studentRoutes);
// app.use('/staff', staffRoutes);
// app.use('/stationary', stationaryRoutes);
// app.use('/stationaryRequest', stationaryRequestRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
