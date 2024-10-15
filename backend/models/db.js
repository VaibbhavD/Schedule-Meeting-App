const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", "Vaibhav@123", {
  host: "localhost",
  dialect: "mysql",
  port: 3300,
});

const Appointment = sequelize.define("Appointment", {
  slot_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available_slots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  meetings: {
    type: DataTypes.JSON, // Ensure this is of type JSON to store arrays
    defaultValue: [],
    // defaultValue: [],
  },
});

// Seed initial slots if not already seeded
const seedSlots = async () => {
  const slots = await Appointment.findAll();
  if (slots.length === 0) {
    await Appointment.bulkCreate([
      { slot_time: "2:00 PM", available_slots: 4, meetings: [] },
      { slot_time: "3:00 PM", available_slots: 4, meetings: [] },
      { slot_time: "4:00 PM", available_slots: 4, meetings: [] },
      { slot_time: "5:00 PM", available_slots: 4, meetings: [] },
    ]);
    console.log("Initial slots created.");
  } else {
    console.log("Slots already exist.");
  }
};

module.exports = { sequelize, Appointment, seedSlots };
