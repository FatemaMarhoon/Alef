const express = require('express');
const StaticValuesController = require('../controllers/StaticValuesController');

const router = express.Router();

router.get('/requestStatuses', StaticValuesController.getAllRequestStatuses);
router.get('/roles', StaticValuesController.getAllRoles);
router.get('/paymentTypes', StaticValuesController.getAllPaymentTypes);
router.get('/paymentStatuses', StaticValuesController.getAllPaymentStatuses);
router.get('/guardianTypes', StaticValuesController.getAllGuardianTypes);
router.get('/attendanceStatuses', StaticValuesController.getAllAttendanceStatuses);
router.get('/applicationStatuses', StaticValuesController.getAllApplicationStatuses);

module.exports = router;