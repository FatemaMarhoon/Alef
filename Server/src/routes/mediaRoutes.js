const express = require('express');
const PreschoolController = require('../controllers/PreschoolController');
const router = express.Router();
const multer = require('multer');

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
  }).fields([
    { name: 'files' },
  ]);

//update media
router.put('/:id',multerMiddleware, PreschoolController.updatePreschoolAddress);

//add media 
router.delete('/:id', PreschoolController.deletePreschool);

module.exports = router;