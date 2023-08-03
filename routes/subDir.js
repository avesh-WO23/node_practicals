const express = require("express");
const router = express.Router();
const path = require("path");

//Router level of middleware is here

//For all routes related to subDir

// router.use((req, res, next) => {
//   console.log("middleware at sub");
//   next();
// });

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subDir", "index.html"));
});

//Middleware for so specific route

// router.use("/test/:id", (req, res, next) => {
//   console.log("test id");
//   res.send("done");
// });

router.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subDir", "test.html"));
});

module.exports = { subRoutes: router };
