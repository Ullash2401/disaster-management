// models/DonationSummary.js
const mongoose = require("mongoose");

const DonationSummarySchema = new mongoose.Schema({
  disasterType: {
    type: String,
    enum: [
      "Flood Relief",
      "Earthquake Relief",
      "Cyclone Relief",
      "Wildfire Relief",
      "General Disaster Fund"
    ],
    required: true,
    unique: true
  },
  totalAmount: { type: Number, default: 0 },
  unassignedAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("DonationSummary", DonationSummarySchema);