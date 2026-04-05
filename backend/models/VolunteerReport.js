// backend/models/VolunteerReport.js
const mongoose = require("mongoose");

const volunteerReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    disasterArea: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    allocatedAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    items: {
      type: [
        {
          reason: { type: String, required: true },
          amountSpent: { type: Number, required: true, min: 0 },
        },
      ],
      default: [],
    },
    remainingBalance: {
      type: Number,
      min: 0,
      default: 0,
    },
    requestMoreFunds: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// -------------------- PRE-SAVE HOOK --------------------
// Calculate remainingBalance and requestMoreFunds automatically
volunteerReportSchema.pre("save", function () {
  const totalSpent = this.items.reduce(
    (sum, item) => sum + (item.amountSpent || 0),
    0
  );

  this.remainingBalance = (this.allocatedAmount || 0) - totalSpent;

  this.requestMoreFunds =
    this.remainingBalance < (this.allocatedAmount || 0) * 0.1;
});

// Export model
module.exports = mongoose.model("VolunteerReport", volunteerReportSchema);