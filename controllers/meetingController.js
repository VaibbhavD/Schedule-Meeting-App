const meetingModel = require("../models/meetingModel");

// Get all meetings
exports.getMeetings = (req, res) => {
  meetingModel.getAllMeetings((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Book a meeting
exports.bookMeeting = (req, res) => {
  const { slotTime, name, email } = req.body;
  meetingModel.bookMeeting(slotTime, name, email, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Meeting booked!", meetingLink: result.meeting_link });
  });
};

// Cancel a meeting
exports.cancelMeeting = (req, res) => {
  const meetingId = req.params.id;
  meetingModel.cancelMeeting(meetingId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Meeting canceled and slot availability updated!" });
  });
};
