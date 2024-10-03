const connection = require('../config/db');

const Train = {
    create: async (trainData) => {
        const { name, source, destination, available_seats } = trainData;
        const [result] = await connection.query(
            'INSERT INTO trains (name, source, destination, available_seats) VALUES (?, ?, ?, ?)',
            [name, source, destination, available_seats]
        );
        return result;
    },

    findSeatsByTrainId: async (train_id) => {
        const [rows] = await connection.query('SELECT available_seats FROM trains WHERE id = ?', [train_id]);
        return rows;
    },

    findAll: async () => {
        const [rows] = await connection.query('SELECT * FROM trains');
        return rows;
    },

    update: async (id, available_seats) => {
        const [result] = await connection.query(
            'UPDATE trains SET available_seats = ? WHERE id = ?',
            [available_seats, id]
        );
        return result;
    },

    updateSeats: async (id, availableSeats) => {
        const [result] = await connection.query(
            'UPDATE trains SET available_seats = ? WHERE id = ?',
            [availableSeats, id]
        );
        return result;
    },

    findAvailableSeats: async (source, destination) => {
        const [rows] = await connection.query(
            'SELECT * FROM trains WHERE source = ? AND destination = ?',
            [source, destination]
        );
        return rows;
    }
};

module.exports = Train;
