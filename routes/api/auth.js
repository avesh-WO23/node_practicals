const express = require("express");
const {
  handleLogIn,
  handleSignUp,
  handleRefreshToken,
} = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", handleSignUp);
router.post("/login", handleLogIn);
router.post("/refreshToken", handleRefreshToken);

module.exports = { authRoutes: router };
