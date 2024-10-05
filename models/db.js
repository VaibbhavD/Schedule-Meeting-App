const mysql = require("mysql");

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", // Replace with your MySQL password
  database: "meeting_booking",
  port: 3300,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

module.exports = db;
