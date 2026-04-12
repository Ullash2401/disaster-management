const mongoose = require("mongoose");

const carbonLogSchema = new mongoose.Schema(
  {
    method: String,
    route: String,

    // 📦 Data transfer (REAL VALUES)
    requestBytes: Number,
    responseBytes: Number,
    totalBytes: Number,

    // 📊 Human-readable
    requestKB: Number,
    responseKB: Number,
    totalKB: Number,

    // 🌱 Environmental impact
    carbonGrams: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarbonLog", carbonLogSchema);