const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// -------------------- GET ACCOUNT DETAILS --------------------
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- UPDATE ACCOUNT --------------------
router.post("/update", async (req, res) => {
  const { userId, username, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (username) user.name = username;
    if (email) user.email = email;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    res.json({ success: true, message: "Account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- DELETE ACCOUNT --------------------
router.delete("/delete", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;