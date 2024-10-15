const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Route to get available slots
router.get("/available-slots", appointmentController.getAvailableSlots);

// Route to book a slot
router.post("/book-slot", appointmentController.bookSlot);

// Route to get all meetings
router.get("/meetings", appointmentController.getAllMeetings);

// Route to cancel a meeting
router.delete("/cancel-meeting/:id", appointmentController.cancelMeeting);

module.exports = router;
