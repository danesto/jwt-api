const express = require('express');
const router = express.Router();

//Controllers
const reservationController = require('../Controllers/ReservationController');
const verificationController = require('../Controllers/VerificationController');

// Middleware for token verification, checks if token is valid before returning endpoint data
const tokenVerificationMiddleware = verificationController.verifyToken;

router.get('/reservations', tokenVerificationMiddleware, reservationController.getAllReservations);
router.post('/reservations', tokenVerificationMiddleware, reservationController.addNewReservation);
router.get('/filter-reservations', tokenVerificationMiddleware, reservationController.filterByDate);
router.post('/reservations/search', tokenVerificationMiddleware, reservationController.searchReservations);
router.post('/reservations/delete', tokenVerificationMiddleware, reservationController.deleteResevations);

module.exports = router;