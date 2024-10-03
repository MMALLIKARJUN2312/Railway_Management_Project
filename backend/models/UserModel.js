const connection = require('../config/db');

const User = {
    create: async (userData) => {
        const { username, email, password, role } = userData;
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        return result;
    },

    findByEmail: async (email) => {
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    }
};

module.exports = User;
