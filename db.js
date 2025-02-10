const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",        
    password: "mysql2025",  
    database: "food_waste_management"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err);
        return;
    }
    console.log("✅ MySQL Connected Successfully!");
});

module.exports = db;
