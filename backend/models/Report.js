const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  date: { type: Date, default: Date.now },
  severity: { type: String, required: true },
  affectedPeople: { type: Number, default: 0 },
  location: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ← Add this
}, {
  timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);