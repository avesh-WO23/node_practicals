import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/empControllers.js";
import { validateEmployee } from "../middlewares/joiValidationMiddlewares.js";

const router = express.Router();

router.post("/register", [validateEmployee, createEmployee]);

router.get("/", getEmployees);

router
  .route("/:id")
  .put([validateEmployee, updateEmployee])
  .get(getEmployees)
  .delete(deleteEmployee)
  .patch([validateEmployee, updateEmployee]);

export { router as employeesRoutes };
