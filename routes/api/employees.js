const express = require("express");
const router = express.Router();
const {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
} = require("../../controllers/empControllers");
const { validationMiddleware } = require("../../middlewares/empValidation");

//for all routes
router
  .route("/")
  .get([getEmployees])
  .post([validationMiddleware, createNewEmployee])
  .put([validationMiddleware, updateEmployee]);

//For specific user
router.route("/:id").get([getEmployees]).delete(deleteEmployee);

module.exports = { employeesRoutes: router };
