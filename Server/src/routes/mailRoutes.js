const express = require('express');
const MailController = require('../controllers/MailController');
const { checkToken } = require('../config/token_validation');
const router = express.Router();

router.post('/',checkToken, MailController.sendEmail)
router.get('/', MailController.sendCustomPasswordResetEmail);
module.exports = router;