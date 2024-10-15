const { Appointment } = require("../models/db");
const { Op } = require("sequelize"); // Import Op from sequelize

// Get available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Appointment.findAll({
      where: { available_slots: { [Op.gt]: 0 } },
    });
    res.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Failed to fetch available slots." });
  }
};

// Book a slot
exports.bookSlot = async (req, res) => {
  const { name, email, slot_time } = req.body;

  try {
    // Find the slot by slot_time
    const slot = await Appointment.findOne({ where: { slot_time } });

    if (!slot || slot.available_slots === 0) {
      return res.status(400).json({ message: "Slot unavailable." });
    }

    // Create the new meeting object
    const meeting = {
      id: Date.now(), // Unique meeting ID (can be improved with UUID if needed)
      name,
      email,
      slot_time,
      meeting_link: `https://meeting.com/${name}-${Date.now()}`, // Example meeting link
    };

    // Push the new meeting into the meetings array
    const updatedMeetings = [...slot.meetings, meeting]; // Spread operator to push the new meeting
    slot.meetings = updatedMeetings; // Assign updated meetings array back

    // Decrement available slots count
    slot.available_slots -= 1;

    // Save the updated slot back to the database
    await slot.save();

    // Respond with the booked meeting details
    res.json({ meeting });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ message: "Failed to book slot." });
  }
};
// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const slots = await Appointment.findAll();
    const meetings = slots.flatMap((slot) => slot.meetings);
    res.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "Failed to fetch meetings." });
  }
};

// Cancel a meeting
exports.cancelMeeting = async (req, res) => {
  const meetingId = parseInt(req.params.id);
  console.log("Meeting ID:", meetingId);

  try {
    // Fetch all slots to search for the meeting
    const slots = await Appointment.findAll();

    for (const slot of slots) {
      // Ensure that meetings is an array before proceeding
      if (Array.isArray(slot.meetings)) {
        // Find the meeting in the array by ID
        const meetingIndex = slot.meetings.findIndex(
          (meeting) => meeting.id === meetingId
        );

        console.log("Meeting Index:", meetingIndex);

        // If the meeting is found, remove it and update the slot
        if (meetingIndex !== -1) {
          // Use filter to remove the meeting from the array
          const updatedMeetings = slot.meetings.filter(
            (meeting) => meeting.id !== meetingId
          );

          console.log("Updated Meetings Array:", updatedMeetings);
          slot.meetings = updatedMeetings; // Assign updated meetings array back

          // Increment available slots count
          slot.available_slots += 1;

          // Save the updated slot and meetings back to the database
          await slot.save();

          // Respond with success message
          return res.json({ message: "Meeting canceled successfully." });
        }
      }
    }

    // If no meeting is found, send a 404 error response
    res.status(404).json({ message: "Meeting not found." });
  } catch (error) {
    console.error("Error canceling the meeting:", error);
    res.status(500).json({ message: "Failed to cancel meeting." });
  }
};
