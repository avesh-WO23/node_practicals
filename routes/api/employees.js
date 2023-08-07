const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
} = require("../../controllers/employeesController");

//for all routes
router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

//For specific user
router.route("/:id").get(getEmployee);

module.exports = { employeesRoutes: router };
