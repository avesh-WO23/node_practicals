import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import Employee from "../models/employeeModel.js";
import sendMail from "../utils/sendMail.js";

interface Verification {
  email: string;
  link: string;
}

const VERIFY_TOKEN_SECRET =
  process.env.VERIFY_TOKEN_SECRET || "abcdefghijklmnopqrstuvwxyz";

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
      //jwt token for verify the user
      const verifyToken = jwt.sign(
        { email: req.body.email },
        VERIFY_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const verification: Verification = {
        email: req.body.email,
        link: `http://localhost:${process.env.PORT}/api/employees/verification/${verifyToken}`,
      };
      //Email verification
      const emailed = await sendMail(verification);
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

//verify the user
export const verifyEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Check user email is exist in DB
  const verifyJwt: any = jwt.verify(
    req.params.verifyToken,
    VERIFY_TOKEN_SECRET
  );
  try {
    const existUser: any = await Employee.findOne({
      email: verifyJwt["email"],
    });
    if (!existUser) {
      next(createHttpError.NotFound("Employee is not found!"));
    } else {
      if (existUser.isVerified) {
        next(createHttpError(400, "User is already verified!"));
      }
      const updatedEmployee = await Employee.findByIdAndUpdate(
        existUser._id,
        { isVerified: true },
        { new: true }
      );
      return res.send("Employee verified successful!");
    }
  } catch (error) {
    next(error);
  }
};
