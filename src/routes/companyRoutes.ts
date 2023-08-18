import express from "express";
import {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyControllers.js";
import { validateCompany } from "../middlewares/joiValidationMiddlewares.js";

const router = express.Router();

router
  .route("/companies")
  .post([validateCompany, createCompany])
  .get(getCompanies);

router
  .route("/companies/:id")
  .get(getCompanies)
  .delete(deleteCompany)
  .put([validateCompany, updateCompany])
  .patch([validateCompany, updateCompany]);

export { router as companyRoutes };
