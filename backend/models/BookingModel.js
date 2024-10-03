const connection = require('../config/db');

const Booking = {
    create: async (userId, trainId, seats) => {
        const [result] = await connection.query(
            'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
            [userId, trainId, seats]
        );
        return result;
    },

    findById: async (bookingId) => {
        const [rows] = await connection.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
        return rows;
    },

    findAll: async () => {
        const [rows] = await connection.query('SELECT * FROM bookings');
        return rows;
    }
};

module.exports = Booking;
