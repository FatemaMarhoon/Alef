const express = require('express');
const StationaryController = require('../controllers/StationaryController');
const router = express.Router();

// Get all stationary items
router.get('/', StationaryController.getAllStationary);

// Get stationary item by stationary_id
router.get('/:stationary_id', StationaryController.getStationaryById);

// Create a new stationary item
router.post('/', StationaryController.createStationary);

// Update stationary item
router.put('/:stationary_id', StationaryController.updateStationary);

// Delete stationary item
router.delete('/:stationary_id', StationaryController.deleteStationary);

module.exports = router;
