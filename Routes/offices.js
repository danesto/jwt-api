const express = require('express');
const router = express.Router();

//Controllers
const officeController = require('../Controllers/OfficeController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/offices', tokenVerificationMiddleware, officeController.getAllOffices);
router.post('/offices', tokenVerificationMiddleware, officeController.addOffice);
router.get('/office/delete/:id', tokenVerificationMiddleware, officeController.deleteOffice);

module.exports = router;