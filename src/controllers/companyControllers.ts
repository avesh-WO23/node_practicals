import { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel.js";
import createError from "http-errors";

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
    await Company.findByIdAndRemove(id);
    res.status(200).send("Deleted!");
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
      const andQueries = Object.keys(queryObj).map((key) => {
        const searchQuery = {} as any;
        if (key === "status") {
          searchQuery[key] = queryObj[key];
        } else {
          searchQuery[key] = { $regex: new RegExp(queryObj[key], "i") };
        }
        return searchQuery;
      });
      const companies = await Company.find({ $and: andQueries });
      return res.send(companies);
    }
    const allCompanies = await Company.find({});
    return res.send(allCompanies);
  } catch (error) {
    next(error);
  }
};
