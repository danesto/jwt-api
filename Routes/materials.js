const express = require('express');
const router = express.Router();

//Controllers
const materialController = require('../Controllers/MaterialController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/materials', tokenVerificationMiddleware, materialController.getAllMaterials);
router.post('/materials', tokenVerificationMiddleware, materialController.newMaterial);
router.post('/material/:id', tokenVerificationMiddleware, materialController.getMaterial);

module.exports = router;