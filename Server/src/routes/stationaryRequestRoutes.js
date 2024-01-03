const express = require('express');
const StationaryRequestController = require('../controllers/StationaryRequestController');
const { checkStaff, checkToken } = require('../config/token_validation');
const router = express.Router();

// Get all stationary requests
router.get('/preschool/:preschoolId',checkToken, StationaryRequestController.getAllStationaryRequests);

// Get stationary request by request_id
router.get('/:request_id', StationaryRequestController.getStationaryRequestById);

// Create a new stationary request
router.post('/',checkToken, StationaryRequestController.createStationaryRequest);

// Update stationary request
router.put('/:request_id',checkToken, StationaryRequestController.updateStationaryRequest);

// Delete stationary request
router.delete('/:request_id',checkToken, StationaryRequestController.deleteStationaryRequest);

module.exports = router;
