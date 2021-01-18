const express = require('express');
const router = express.Router();

//Controllers
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
// const tokenVerificationMiddleware = verificationController.verifyToken;

//Login endpoint which is going to be verifed by passowrd and username
router.post('/login', verificationController.getUser);

module.exports = router;