const express = require('express');
const router = express.Router();

//Controllers
const reservationController = require('../Controllers/ReservationController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/reservations', tokenVerificationMiddleware, reservationController.getAllReservations);
router.post('/reservations', tokenVerificationMiddleware, reservationController.addNewReservation);
module.exports = router;