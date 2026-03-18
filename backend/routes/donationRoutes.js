const express = require("express");
const router = express.Router();
const {
  createDonation,
  getDonationSummary,
  assignCategoryPartial
} = require("../controllers/donationController");

// Create donation (existing)
router.post("/", createDonation);

// Get total donations per disaster type
router.get("/summary", getDonationSummary);

// Assign part of a category to a user
router.put("/assign-category", assignCategoryPartial);

module.exports = router;