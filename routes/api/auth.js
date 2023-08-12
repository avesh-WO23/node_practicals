const express = require("express");
const {
  handleLogIn,
  handleSignUp,
  handleRefreshToken,
  handleLogOut,
} = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", handleSignUp);
router.post("/login", handleLogIn);
router.post("/refreshToken", handleRefreshToken);
router.post("/logout", handleLogOut);

module.exports = { authRoutes: router };
