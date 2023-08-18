import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/empControllers.js";

const router = express.Router();

router.post("/register", createEmployee);

router.get("/employees", getEmployees);

router
  .route("/employees/:id")
  .put(updateEmployee)
  .get(getEmployees)
  .delete(deleteEmployee)
  .patch(updateEmployee);

export { router as employeesRoutes };
