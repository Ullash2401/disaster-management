const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  shortDescription: {
    type: String,
    required: true
  },

  fullDescription: {
    type: String,
    required: true
  },

  date: {
    type: Date
  },

  severity: {
    type: String,
    enum: ["Low", "High", "Critical"],
    required: true
  },

  affectedPeople: {
    type: Number,
    default: 0
  },

  location: {
    type: String
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);