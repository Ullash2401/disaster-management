const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, async (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    userId: req.user.id,
  });
});


router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

module.exports = router;

