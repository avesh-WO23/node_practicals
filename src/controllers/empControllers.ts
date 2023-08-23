import Employee from "../models/employeeModel.js";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";

//Create
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isEmployeeExist = await Employee.find({
    email: { $regex: new RegExp(req.body.email, "i") },
  });
  if (!isEmployeeExist.length) {
    try {
      const result = await Employee.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      });
      //Email verification
      const emailed = await sendMail(req.body.email);
      console.log("emailed", emailed);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  } else {
    next(createHttpError(400, "This Email is already existed!"));
  }
};

//Update
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    ).populate("companyId");
    if (!updatedEmployee) {
      return next(createHttpError(404, "Employee not found!"));
    }
    return res.send(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

//Delete
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const delEmployee = await Employee.findByIdAndRemove(id, req.body);
    if (!delEmployee) {
      return next(createHttpError(404, "Employee Not found!"));
    }
    return res.send("Deleted!");
  } catch (error) {
    next(error);
  }
};

//Get
export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //For Params
    if (Object.keys(req.params).length) {
      const { id } = req.params;
      const getEmployee = await Employee.find({ _id: id }).populate(
        "companyId"
      );
      if (!getEmployee) {
        return next(createHttpError(404, "Employee Not found!"));
      }
      return res.send(getEmployee);
    } else if (Object.keys(req.query).length) {
      //For Queries
      const searchQueries = {} as any;
      //What if user apply empty value for the query like {firstName=""}
      for (const key in req.query) {
        if (req.query[key]) {
          searchQueries[key] = req.query[key];
        }
      }
      //if User apply multiple search query params
      const multipleQueries = Object.keys(searchQueries).map((q) => {
        const queriesObj = {} as any;
        if (q === "designation") {
          queriesObj[q] = searchQueries[q];
        } else {
          queriesObj[q] = { $regex: new RegExp(searchQueries[q], "i") };
        }
        return queriesObj;
      });
      if (multipleQueries.length) {
        const getEmployees = await Employee.find({
          $and: multipleQueries,
        }).populate("companyId");
        return res.send(getEmployees);
      }
    }
    //for all empty search query params
    const allEmployees = await Employee.find({}).populate("companyId");
    return res.send(allEmployees);
  } catch (error) {
    next(error);
  }
};
