const express = require('express');
const StationaryController = require('../controllers/StationaryController');
const { checkToken, checkStaff } = require('../config/token_validation');
const router = express.Router();

// Get all stationary items
router.get('/preschool/:preschoolId',checkToken, StationaryController.getAllStationary);

// Get stationary item by stationary_id
router.get('/:stationary_id',checkToken, StationaryController.getStationaryById);

// Create a new stationary item
router.post('/',checkStaff, StationaryController.createStationary);

// Update stationary item
router.put('/:stationary_id',checkStaff, StationaryController.updateStationary);

// Delete stationary item
router.delete('/:stationary_id',checkStaff, StationaryController.deleteStationary);

module.exports = router;
