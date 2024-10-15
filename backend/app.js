const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const appointmentRouter = require("./routes/appointmentRoutes");
const { sequelize, seedSlots } = require("./models/db");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/appointments", appointmentRouter);

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "200 - Not Found" });
});

// Seed initial slots and sync the database
sequelize
  .sync()
  .then(async () => {
    await seedSlots(); // Ensure slots are seeded properly
    app.listen(4000, () => console.log("Server running on port 4000"));
  })
  .catch((err) => console.error("Failed to sync database:", err));
