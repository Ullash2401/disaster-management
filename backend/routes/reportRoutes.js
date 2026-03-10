const express = require("express");
const router = express.Router();

const { addReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addReport);

module.exports = router;