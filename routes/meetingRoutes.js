const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

router.get("/meetings", meetingController.getMeetings);
router.post("/book", meetingController.bookMeeting);
router.delete("/cancel/:id", meetingController.cancelMeeting);

module.exports = router;
