import { Request, Response, NextFunction } from "express";
import {
  companyValidation,
  empValidation,
  statusValidation,
} from "../utils/joiValidations.js";

const validateCompany = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "PUT") {
    const result = companyValidation.validate(req.body);
    if (result.error) {
      return res.send(result.error.message);
    }
  }
  if (req.method === "PATCH") {
    const result = statusValidation.validate(req.body);
    if (result.error) {
      return res.send(result.error.message);
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
