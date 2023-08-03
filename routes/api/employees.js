const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

//for all routes
router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    // res.json({ 'firstname': req.body.firstname, 'lastname': req.body.lastname });
  })
  .put((req, res) => {})
  .delete((req, res) => {});

//For specific user
router
  .route("/:id")
  .get((req, res) => {})
  .delete((req, res) => {});

module.exports = { employeesRoutes: router };
