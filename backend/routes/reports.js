const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { protect, authorize } = require("../middleware/authMiddleware");

// -------------------- CREATE REPORT --------------------
// Only admin and scriptwriter can add reports
router.post("/add", protect, authorize("admin", "scriptwriter"), async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, date, severity, affectedPeople, location } = req.body;

    const report = new Report({
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location,
      user: req.user._id // comes from protect middleware
    });

    const savedReport = await report.save();
    res.status(201).json({ message: "Report saved successfully", report: savedReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save report", error: err.message });
  }
});

// -------------------- GET ALL REPORTS --------------------
// All logged-in users can view
router.get("/", protect, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports", error: err.message });
  }
});

module.exports = router;