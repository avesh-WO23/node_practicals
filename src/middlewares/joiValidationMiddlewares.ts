import { Request, Response, NextFunction } from "express";
import {
  companyValidation,
  empValidation,
  statusValidation,
  designationValidation,
} from "../utils/joiValidations.js";
import createHttpError from "http-errors";

//Company Validation
const validateCompany = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "PUT" || req.method === "POST") {
    const result = companyValidation.validate(req.body);
    if (result.error) {
      return next(createHttpError(400, result.error.message));
    }
  }
  if (req.method === "PATCH") {
    const result = statusValidation.validate(req.body);
    if (result.error) {
      return next(createHttpError(400, result.error.message));
    }
  }
  next();
};

//Emp validation
const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "PATCH") {
    const result = designationValidation.validate(req.body);
    if (result.error) {
      return next(createHttpError(400, result.error.message));
    }
  }
  if (req.method === "PUT" || req.method === "POST") {
    const result = empValidation.validate(req.body);
    if (result.error) {
      return next(createHttpError(400, result.error.message));
    }
  }
  next();
};

export { validateCompany, validateEmployee };
