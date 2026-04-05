const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Grab token from header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.error("User not found for token:", decoded);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("Authenticated user:", req.user); // 🔍 Debug log
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// Authorize roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: no user attached" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized for this action" });
    }

    next();
  };
};

module.exports = { protect, authorize };