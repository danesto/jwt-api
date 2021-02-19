const express = require('express');
const router = express.Router();

//Controllers
const verificationController = require('../Controllers/VerificationController');
const leavesController = require('../Controllers/leavesController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/leaves', tokenVerificationMiddleware, leavesController.getAllLeaves);
router.post('/leaves', tokenVerificationMiddleware, leavesController.addNewLeave);
router.get('/leaves/delete/:id', tokenVerificationMiddleware, leavesController.deleteLeave);

module.exports = router;