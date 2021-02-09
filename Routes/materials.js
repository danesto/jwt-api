const express = require('express');
const router = express.Router();

//Controllers
const materialController = require('../Controllers/MaterialController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/materials', tokenVerificationMiddleware, materialController.getAllMaterials);
router.post('/materials', tokenVerificationMiddleware, materialController.addMaterial);
router.post('/material/:id', tokenVerificationMiddleware, materialController.getMaterial);
router.post('/material/delete/:id', tokenVerificationMiddleware, materialController.deleteMaterial);

module.exports = router;