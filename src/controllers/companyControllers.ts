import { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel.js";
import createError from "http-errors";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//Add
export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const existedCompany = await Company.find({
    $or: [
      { name: { $regex: new RegExp(req.body.name, "i") } },
      { email: { $regex: new RegExp(req.body.email, "i") } },
    ],
  });
  if (!existedCompany.length) {
    const addCompany = new Company(req.body);
    try {
      const result = await addCompany.save();
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(400, "Same email or name of company is already existed!"));
  }
};

//Update
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(404, "No company with this ID!"));
  }
  try {
    const updated = await Company.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updated) {
      return next(createError(404, "Not found!"));
    }
    return res.status(200).send(updated);
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(404, "Invalid ID"));
  }
  try {
    const del = await Company.findByIdAndRemove(id);
    if (!del) {
      return next(createError(404, "Not found!"));
    }
    return res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
};

//Get company
export const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (Object.keys(req.params).length) {
      //Params
      const { id } = req.params;
      const getCompany = await Company.find({ _id: id });
      return res.send(getCompany);
    } else if (Object.keys(req.query).length) {
      //Search Queries
      const queryObj = {} as any;
      for (const key in req.query) {
        if (req.query[key]) {
          queryObj[key] = req.query[key];
        }
      }
      //For find the related result from the search query for array of multiple query properties
      const multipleQueries = Object.keys(queryObj).map((key) => {
        const searchQuery = {} as any;
        if (key === "status") {
          searchQuery[key] = queryObj[key];
        } else {
          searchQuery[key] = { $regex: new RegExp(queryObj[key], "i") };
        }
        return searchQuery;
      });
      if (multipleQueries.length) {
        const companies = await Company.find({ $and: multipleQueries });
        return res.send(companies);
      }
    }
    const allCompanies = await Company.find({});
    return res.send(allCompanies);
  } catch (error) {
    next(error);
  }
};
