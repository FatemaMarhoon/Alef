const express = require('express');
const MediaController = require('../controllers/PreschoolMediaController');
const router = express.Router();
const multer = require('multer');

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
}).any();

router.get('/', MediaController.getAllMedia)

//upload media
router.post('/', multerMiddleware, MediaController.uploadMedia);

//delete multiple media 
router.put('/delete', MediaController.deleteMultipleMedia);
//delete media
router.delete('/:id', MediaController.deleteMedia);

module.exports = router;