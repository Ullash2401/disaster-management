const express = require("express");
const router = express.Router();
const { createVolunteerReport } = require("../controllers/volunteerReportController");
const { verifyToken } = require("../middleware/authMiddleware"); // if you have auth

// POST: Create a new volunteer report
// Protected route: user must be logged in
router.post("/", verifyToken, createVolunteerReport);

// You can add more routes later, e.g., GET reports, GET single report, etc.
// router.get("/", verifyToken, getAllVolunteerReports);
// router.get("/:id", verifyToken, getVolunteerReportById);

module.exports = router;