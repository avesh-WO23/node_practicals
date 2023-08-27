import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  verifyEmployee,
  employeeLogin,
  refreshToken,
} from "../controllers/empControllers.js";
import { validateEmployee } from "../middlewares/joiValidationMiddlewares.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", [validateEmployee, createEmployee]);

router.post("/login", employeeLogin);

router.get("/", [authorization, getEmployees]);

router
  .route("/:id")
  .put([authorization, validateEmployee, updateEmployee])
  .get([authorization, getEmployees])
  .delete([authorization, deleteEmployee])
  .patch([authorization, validateEmployee, updateEmployee]);

router.post("/refresh-token", refreshToken);

router.get("/verification/:verifyToken", verifyEmployee);

export { router as employeesRoutes };
