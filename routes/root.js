const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.htm"));
});

router.get("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "message.htm"));
});

module.exports = { homeRoutes: router };
