const mysql = require('mysql2')

// loading environment just incase there's non entry point activity
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

db.connect(error => {
  if (error) {
    console.error('Database connection failed:', error);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;