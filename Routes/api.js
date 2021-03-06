const express = require('express');
const router = express.Router();

//Controllers
const materialController = require('../Controllers/MaterialController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.post('/login', verificationController.getUser);
router.get('/materials', tokenVerificationMiddleware, materialController.getAllMaterials);
router.post('/materials', tokenVerificationMiddleware, materialController.newMaterial);

module.exports = router;