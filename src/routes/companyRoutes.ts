import express from "express";
import {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyControllers.js";
import { validateCompany } from "../middlewares/joiValidationMiddlewares.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/companies")
  .post([authorization, validateCompany, createCompany])
  .get([authorization, getCompanies]);

router
  .route("/companies/:id")
  .get([authorization, getCompanies])
  .delete([authorization, deleteCompany])
  .put([authorization, validateCompany, updateCompany])
  .patch([authorization, validateCompany, updateCompany]);

export { router as companyRoutes };
