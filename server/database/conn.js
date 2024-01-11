const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: '127.8.0.1',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function createDatabase() {
    try {
        await pool.query('CREATE DATABASE IF NOT EXISTS OnlineShopping');
        console.log('OnlineShopping database created or already exists');
    } catch (err) {
        console.error('Error creating database:', err);
        process.exit(1);
    }
}

// createDatabase();  // Call the function to create the database

module.exports = pool;
module.exports.createDatabase = createDatabase;  
