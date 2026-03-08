const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET all users (Admin only)
router.get("/", protect, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// UPDATE role (Admin only)
router.put("/:id/role", protect, authorize("admin"), async (req, res) => {
  const { role } = req.body;

  // Ensure only one admin
  if (role === "admin") {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin && existingAdmin._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Admin already exists" });
    }
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();
  res.json({ message: "Role updated", user });
});

module.exports = router;