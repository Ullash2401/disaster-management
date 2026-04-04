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

    // NEW: Dynamic list of expenditure items
    items: [
      {
        reason: { type: String, required: true },
        amountSpent: { type: Number, required: true, min: 0 },
      },
    ],

    remainingBalance: {
      type: Number,
      min: 0,
    },

    requestMoreFunds: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Auto-calculate remainingBalance and requestMoreFunds
volunteerReportSchema.pre("save", function (next) {
  // Sum up all amountSpent in items
  const totalSpent = this.items.reduce((sum, item) => sum + item.amountSpent, 0);
  this.remainingBalance = this.allocatedAmount - totalSpent;

  // Auto-set requestMoreFunds if balance < 10%
  if (this.remainingBalance < this.allocatedAmount * 0.1) {
    this.requestMoreFunds = true;
  } else {
    this.requestMoreFunds = false;
  }

  next();
});

module.exports = mongoose.model("VolunteerReport", volunteerReportSchema);