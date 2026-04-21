const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const { signAccessToken, signRefreshToken } = require("../utils/tokens");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

const formatAuthResponse = (user, token, refreshToken) => ({
  token,
  refreshToken,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required", code: "VALIDATION_ERROR" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists", code: "EMAIL_EXISTS" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const role = req.body.role === "farmer" ? "farmer" : "customer";
  const user = await User.create({ name, email, passwordHash, role });
  const token = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(201).json(formatAuthResponse(user, token, refreshToken));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required", code: "VALIDATION_ERROR" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
  }
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials", code: "INVALID_CREDENTIALS" });
  }

  const token = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  return res.json(formatAuthResponse(user, token, refreshToken));
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "refreshToken is required", code: "VALIDATION_ERROR" });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.refreshSecret);
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token", code: "INVALID_REFRESH_TOKEN" });
  }

  const user = await User.findById(decoded.sub);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(401).json({ message: "Invalid refresh token", code: "INVALID_REFRESH_TOKEN" });
  }

  const token = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user);
  user.refreshToken = newRefreshToken;
  await user.save();

  return res.json(formatAuthResponse(user, token, newRefreshToken));
});

router.get("/me", requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
