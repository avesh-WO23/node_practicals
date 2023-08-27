import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization?.split(" ")[1];
  const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any) => {
    if (err) {
      return next(createError(400, "Token Expired!"));
    }
    next();
  });
};
