const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'course_platform'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;