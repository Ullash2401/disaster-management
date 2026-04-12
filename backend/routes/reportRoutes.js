const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { protect } = require("../middleware/authMiddleware");

// -------------------- CREATE REPORT --------------------
router.post("/add", protect, async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, date, severity, affectedPeople, location } = req.body;

    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check required fields
    let missingFields = [];
    if (!title) missingFields.push("title");
    if (!shortDescription) missingFields.push("shortDescription");
    if (!fullDescription) missingFields.push("fullDescription");
    if (!severity) missingFields.push("severity");

    if (missingFields.length > 0) {
      return res.status(400).json({ message: "Missing fields", fields: missingFields });
    }

    const report = new Report({
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location,
      user: req.user._id
    });

    const savedReport = await report.save();
    res.status(201).json({ message: "Report saved successfully", report: savedReport });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save report", error: err.message });
  }
});

// -------------------- GET ALL REPORTS --------------------
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email role") // optional: include user info
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reports", error: err.message });
  }
});

module.exports = router;