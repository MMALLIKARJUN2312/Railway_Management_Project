const pool = require('../config/db');

const initializeDatabase = async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), isAdmin BOOLEAN DEFAULT FALSE)');
    await pool.query('CREATE TABLE IF NOT EXISTS trains (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), source VARCHAR(255), destination VARCHAR(255), seats INT)');
    await pool.query('CREATE TABLE IF NOT EXISTS bookings (id INT AUTO_INCREMENT PRIMARY KEY, train_id INT, user_id INT, FOREIGN KEY (train_id) REFERENCES trains(id), FOREIGN KEY (user_id) REFERENCES users(id))');
};

initializeDatabase().catch(console.error);
