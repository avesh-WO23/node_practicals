const express = require("express");
const router = express.Router();
const {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
} = require("../../controllers/empControllers");

//for all routes
router.route("/").get(getEmployees).post(createNewEmployee).put(updateEmployee);

//For specific user
router.route("/:id").get(getEmployees).delete(deleteEmployee);

module.exports = { employeesRoutes: router };
