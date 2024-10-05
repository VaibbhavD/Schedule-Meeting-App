const db = require("./db");

// Get all meeting slots
const getAllMeetings = (callback) => {
  db.query("SELECT * FROM meetings", callback);
};

// Book a meeting
const bookMeeting = (slotTime, name, email, callback) => {
  const meetingLink = `https://meetings.com/${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  db.query(
    `UPDATE meetings SET available_slots = available_slots - 1, name = ?, email = ?, meeting_link = ? WHERE slot_time = ? AND available_slots > 0`,
    [name, email, meetingLink, slotTime],
    callback
  );
};

// Cancel a meeting
const cancelMeeting = (meetingId, callback) => {
  db.query(
    "SELECT * FROM meetings WHERE id = ?",
    [meetingId],
    (err, result) => {
      if (err || result.length === 0)
        return callback(err || new Error("Meeting not found"));

      const slotTime = result[0].slot_time;

      db.query(
        "UPDATE meetings SET available_slots = available_slots + 1, name = NULL, email = NULL, meeting_link = NULL WHERE id = ?",
        [meetingId],
        (err, result) => {
          if (err) return callback(err);
          callback(null, result);
        }
      );
    }
  );
};

module.exports = {
  getAllMeetings,
  bookMeeting,
  cancelMeeting,
};
