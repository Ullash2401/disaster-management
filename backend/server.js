const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routes
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/admin");
const donationRoutes = require("./routes/donationRoutes");
const volunteerReportRoutes = require("./routes/volunteerReportRoutes");
const accountRoutes = require("./routes/accountRoutes");

// carbon tracker
const { carbonTracker, carbonStats } = require("./middleware/carbonTracker");

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// 🌱 carbon middleware
app.use(carbonTracker);

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteer-reports", volunteerReportRoutes);
app.use("/api/account", accountRoutes);

// ---------------- TEST ROUTE ----------------
app.get("/api/test-carbon", (req, res) => {
  const randomSize = Math.floor(Math.random() * 200) + 50;

  const data = Array(randomSize).fill({
    name: "Test User",
    email: "test@example.com",
    message: "Dynamic data " + Math.random(),
  });

  const responseString = JSON.stringify(data);
  const bytes = Buffer.byteLength(responseString, "utf8");
  const co2 = bytes * 0.00000015;

  res.json({
    data,
    bytes,
    co2,
  });
});

// 🌱 REAL CARBON STATS API (FIXED)
app.get("/api/carbon-stats", (req, res) => {
  res.json(carbonStats);
});

// ---------------- DB ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
