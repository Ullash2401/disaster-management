const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect route
const protect = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token invalid or expired"
    });
  }
};

// Authorize roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
};

module.exports = { protect, authorize };