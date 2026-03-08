const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// CREATE REPORT with full debug info
router.post("/add", async (req, res) => {
  // Log the incoming request body
  console.log("Incoming report data:", req.body);

  try {
    const {
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location,
      userId
    } = req.body;

    // Prepare report data
    const reportData = {
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople: Number(affectedPeople) || 0,
      location,
      user: userId || undefined // optional for now
    };

    const report = new Report(reportData);
    const savedReport = await report.save();

    console.log("Report saved successfully:", savedReport);

    res.status(201).json({
      message: "Report saved successfully ✅",
      report: savedReport
    });

  } catch (err) {
    // Log the full error
    console.error("Error saving report:", err);

    // If validation error, highlight which fields caused it
    if (err.name === "ValidationError") {
      const fieldErrors = Object.keys(err.errors).map(
        (field) => `${field}: ${err.errors[field].message}`
      );

      return res.status(400).json({
        message: "Validation failed ❌",
        fields: fieldErrors,
        receivedData: req.body // include what was sent
      });
    }

    // Other errors
    res.status(500).json({
      message: "Failed to save report ❌",
      error: err.message,
      receivedData: req.body
    });
  }
});

module.exports = router;