const express = require("express");
const bodyParser = require("body-parser");
const meetingRoutes = require("./routes/meetingRoutes");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static("views"));

app.use("/api", meetingRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
