const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/seats', bookingController.getSeatAvailability);

router.post('/book/:train_id', authMiddleware, bookingController.bookSeats);

router.get('/details/:booking_id', adminMiddleware, bookingController.getBookingDetails);

router.get('/all', adminMiddleware, bookingController.getAllBookings);

module.exports = router;
