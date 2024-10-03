const Booking = require('../models/BookingModel');
const Train = require('../models/TrainModel');

exports.getSeatAvailability = async (req, res) => {
    try {
        const { source, destination } = req.query;

        console.log('Received query parameters:', { source, destination });

        if (!source || !destination) {
            return res.status(400).json({ message: 'Source and destination are required' });
        }

        const trains = await Train.findAvailableSeats(source, destination);

        console.log('Trains found:', trains);

        res.json(trains);
    } catch (error) {
        console.error('Error fetching seat availability:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.bookSeats = async (req, res) => {
    try {
        const { train_id } = req.params;
        const { seats } = req.body;
        const user_id = req.user.id;

        const train = await Train.findSeatsByTrainId(train_id);

        if (!Array.isArray(train)) {
            console.error("Error: Expected an array but got:", train);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (train.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        if (!train[0] || typeof train[0].available_seats === 'undefined') {
            console.error("Error: 'available_seats' not found in train:", train);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (train[0].available_seats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        await Train.updateSeats(train_id, train[0].available_seats - seats);
        await Booking.create(user_id, train_id, seats);

        res.status(201).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error booking seats:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getBookingDetails = async (req, res) => {
    try {
        const bookingId = req.params.booking_id;
        const [booking] = await Booking.findById(bookingId);

        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
