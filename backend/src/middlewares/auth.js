const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }

    const decoded = jwt.verify(token, env.accessSecret);
    const user = await User.findById(decoded.sub).select("-passwordHash -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: "Forbidden", code: "FORBIDDEN" });
  }
  return next();
};

module.exports = {
  requireAuth,
  requireRole,
};
