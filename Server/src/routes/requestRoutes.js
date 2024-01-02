const express = require('express');
const RequestController = require('../controllers/RequestController');
const { checkSuperAdmin } = require('../config/token_validation');

const router = express.Router();

// Get all requests
router.get('/',checkSuperAdmin, RequestController.getAllRequests);

// Create a new request
router.post('/', RequestController.createRequest);

// Get a request by ID
router.get('/:id',checkSuperAdmin, RequestController.getRequestById);

// Update a request by ID
router.put('/:id',checkSuperAdmin, RequestController.updateRequest);

// Update a request by ID
router.patch('/:id',checkSuperAdmin, RequestController.updateRequestStatus);

// Delete a request by ID
router.delete('/:id',checkSuperAdmin, RequestController.deleteRequest);

module.exports = router;
