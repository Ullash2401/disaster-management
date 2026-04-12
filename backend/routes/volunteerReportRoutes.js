const express = require("express");
const router = express.Router();

// Import controller
const {
  createVolunteerReport,
  getAllVolunteerReports,
  getVolunteerReportById,
} = require("../controllers/volunteerReportController");

// Import auth middleware
const { protect } = require("../middleware/authMiddleware");

// -------------------- ROUTES --------------------

// Create a new volunteer report
router.post("/", protect, createVolunteerReport);

// Fetch all reports
router.get("/", protect, getAllVolunteerReports);

// Fetch single report by ID
router.get("/:id", protect, getVolunteerReportById);

module.exports = router;