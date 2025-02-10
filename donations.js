const express = require("express");
const db = require("../db");
const router = express.Router();

// Add a food donation
router.post("/add", (req, res) => {
    const { donor_id, food_name, quantity, expiry_date } = req.body;
    const sql = "INSERT INTO donations (donor_id, food_name, quantity, expiry_date) VALUES (?, ?, ?, ?)";

    db.query(sql, [donor_id, food_name, quantity, expiry_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "✅ Donation added successfully!" });
    });
});

// Get all donations
router.get("/", (req, res) => {
    db.query("SELECT * FROM donations", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
