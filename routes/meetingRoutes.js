const express = require("express");
const router = express.Router();
const meetingController = require("../backend/controllers/appointmentController");

// Get all meeting slots
router.get("/slots", (req, res) => {
  meetingController.getAllMeetings((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Book a meeting
router.post("/book", (req, res) => {
  const { slot_time, name, email } = req.body;
  meetingController.bookMeeting(slot_time, name, email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ meeting_link: results.insertId });
  });
});

// Cancel a meeting
router.post("/cancel", (req, res) => {
  const { slot_time, name, email } = req.body;
  meetingController.cancelMeeting(slot_time, name, email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Meeting cancelled" });
  });
});

module.exports = router;
