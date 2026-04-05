const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// -------------------- ROUTES --------------------
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/admin");
const donationRoutes = require("./routes/donationRoutes");
const volunteerReportRoutes = require("./routes/volunteerReportRoutes"); // ✅ existing
const accountRoutes = require("./routes/accountRoutes"); // ✅ new account routes
const { initCategories } = require("./controllers/donationController");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());

// -------------------- API ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteer-reports", volunteerReportRoutes);
app.use("/api/account", accountRoutes); // ✅ account update/delete

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Initialize donation categories if needed
    await initCategories();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// -------------------- TEST ROUTE --------------------
app.get("/add-test", async (req, res) => {
  try {
    const test = mongoose.connection.db.collection("testCollection");
    const result = await test.insertOne({ name: "Mahdi", role: "Student" });
    res.send(result);
  } catch (err) {
    res.status(500).send("Error inserting: " + err.message);
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});