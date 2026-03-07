const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// CREATE REPORT
router.post("/add", async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, date, severity, affectedPeople, location, userId } = req.body;

    const report = new Report({
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location,
      user: userId, // attach logged-in user
    });

    const savedReport = await report.save();
    res.json(savedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL REPORTS
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email"); // populate user info
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;