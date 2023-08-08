const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
} = require("../../controllers/empControllers");

//for all routes
router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee);

//For specific user
router.route("/:id").get(getEmployee).delete(deleteEmployee);

module.exports = { employeesRoutes: router };
