const express = require("express");
const db = require("../db");
const router = express.Router();

// 📌 1️⃣ Request Food
router.post("/request", (req, res) => {
    const { recipient_id, donation_id } = req.body;

    const sql = "INSERT INTO food_requests (recipient_id, donation_id, status) VALUES (?, ?, 'Pending')";
    
    db.query(sql, [recipient_id, donation_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "✅ Food request sent successfully!" });
    });
});

// 📌 2️⃣ Get All Requests
router.get("/", (req, res) => {
    const sql = `
        SELECT food_requests.id, users.name AS recipient_name, donations.food_name, food_requests.status
        FROM food_requests
        JOIN users ON food_requests.recipient_id = users.id
        JOIN donations ON food_requests.donation_id = donations.id
    `;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 📌 3️⃣ Approve/Reject Request
router.post("/update-status", (req, res) => {
    const { request_id, status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status!" });
    }

    const sql = "UPDATE food_requests SET status = ? WHERE id = ?";
    
    db.query(sql, [status, request_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `✅ Request ${status} successfully!` });
    });
});

module.exports = router;
