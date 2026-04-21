const jwt = require("jsonwebtoken");
const env = require("../config/env");

const signAccessToken = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, env.accessSecret, {
    expiresIn: env.accessExpiresIn,
  });

const signRefreshToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, env.refreshSecret, {
    expiresIn: env.refreshExpiresIn,
  });

module.exports = {
  signAccessToken,
  signRefreshToken,
};
