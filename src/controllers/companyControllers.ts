import { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel.js";
import createError from "http-errors";

//Add
export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addCompany = new Company(req.body);
  try {
    const result = await addCompany.save();
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

//Update
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) return next(createError(404, "Not Found!"));
  try {
    const updated = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
};

//Delete
export const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) return next(createError(404, "Not Found!"));
  try {
    await Company.findByIdAndRemove(id, req.body);
    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
};

//Get company
export const getCompanies = (req: Request, res: Response) => {};
