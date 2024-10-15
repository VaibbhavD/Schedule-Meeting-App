const db = require("../backend/models/db");

// Create a new meeting slot
const createMeeting = (slotTime, availableSlots, callback) => {
  const participants = JSON.stringify([]); // Default empty array for participants

  db.query(
    "INSERT INTO meetings (slot_time, available_slots, participants) VALUES (?, ?, ?)",
    [slotTime, availableSlots, participants],
    callback
  );
};

// Book a meeting
const bookMeeting = (slotTime, name, email, callback) => {
  const meetingLink = `https://meetings.com/${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // First, check if the slot is not fully booked (less than 4 participants)
  db.query(
    `SELECT participants FROM meetings WHERE slot_time = ?`,
    [slotTime],
    console.log(slotTime),
    (err, result) => {
      if (err || result.length === 0) {
        return callback(null, {
          success: false,
          message: "Slot not found or error occurred",
        });
      }

      const participants = result[0].participants
        ? JSON.parse(result[0].participants)
        : [];

      if (participants.length >= 4) {
        return callback(null, {
          success: false,
          message: "This slot is fully booked",
        });
      }

      // Add the new participant
      participants.push({ name, email, meeting_link: meetingLink });

      // Update the meeting record with the new participant
      db.query(
        `UPDATE meetings SET participants = ? WHERE slot_time = ?`,
        [JSON.stringify(participants), slotTime],
        (updateErr) => {
          if (updateErr) {
            return callback(null, {
              success: false,
              message: "Error updating slot",
            });
          }

          return callback(null, {
            success: true,
            message: "Booking successful",
            meetingLink,
          });
        }
      );
    }
  );
};

// Get all available meetings
const getAllMeetings = (callback) => {
  db.query("SELECT * FROM meetings", callback);
};

module.exports = {
  createMeeting,
  bookMeeting,
  getAllMeetings,
};
