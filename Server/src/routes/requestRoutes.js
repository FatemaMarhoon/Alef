const express = require('express');
const RequestController = require('../controllers/RequestController');

const router = express.Router();

// Get all requests
router.get('/', RequestController.getAllRequests);

// Create a new request
router.post('/', RequestController.createRequest);

// Get a request by ID
router.get('/:id', RequestController.getRequestById);

// Update a request by ID
router.put('/:id', RequestController.updateRequest);

// Update a request by ID
router.patch('/:id', RequestController.updateRequestStatus);

// Delete a request by ID
router.delete('/:id', RequestController.deleteRequest);

module.exports = router;
