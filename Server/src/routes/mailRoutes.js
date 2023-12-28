const express = require('express');
const MailController = require('../controllers/MailController');
const router = express.Router();

router.post('/', MailController.sendEmail)

module.exports = router;