const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

// -------------------- GET ALL USERS --------------------
// Only admin can access
router.get("/users", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password -resetToken");
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// -------------------- UPDATE USER ROLE --------------------
// Only admin can assign roles
router.put("/users/:id/role", protect, authorize("admin"), async (req, res) => {
  const { role } = req.body;
  const allowedRoles = ["admin", "scriptwriter", "viewer"];

  // Check for valid role
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // SINGLE ADMIN RULE: cannot assign "admin" if one already exists
    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin && existingAdmin._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    user.role = role;
    await user.save();

    res.json({
      message: "User role updated successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ message: "Failed to update user role" });
  }
});

module.exports = router;