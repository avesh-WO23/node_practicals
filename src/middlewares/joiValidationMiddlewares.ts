import { Request, Response, NextFunction } from "express";
import {
  companyValidation,
  empValidation,
  statusValidation,
} from "../utils/joiValidations.js";
import createHttpError from "http-errors";

const validateCompany = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "PUT") {
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

const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const result = empValidation.validate(req.body);
  if (result.error) {
    return res.send(result.error.message);
  }
  next();
};

export { validateCompany, validateEmployee };
