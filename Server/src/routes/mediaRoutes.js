const express = require('express');
const MediaController = require('../controllers/PreschoolMediaController');
const router = express.Router();
const multer = require('multer');
const { checkToken, checkBothAdmins } = require('../config/token_validation');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
}).any();

router.get('/',checkToken, MediaController.getAllMedia) // public info 

//upload media
router.post('/',checkBothAdmins, multerMiddleware, MediaController.uploadMedia);

//delete multiple media 
router.put('/delete',checkBothAdmins, MediaController.deleteMultipleMedia);

//delete media
router.delete('/:id',checkBothAdmins, MediaController.deleteMedia);

module.exports = router;