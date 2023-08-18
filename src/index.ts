import express from "express";
import dotenv from "dotenv";
import { companyRoutes } from "./routes/companyRoutes.js";
import { employeesRoutes } from "./routes/employeeRoutes.js";
import connectDb from "./config/mongoConfig.js";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

const app = express();

//env config
dotenv.config();

//Db connection
connectDb();

//req.body JSON parser
app.use(express.json());

//Routes
app.use("/api", companyRoutes);
app.use("/api", employeesRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = createError(404, `Not Found!`);
  next(err);
});

//Global error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

//connection of server
app.listen(process.env.PORT, () => {
  console.log(`Server now running on port ${process.env.PORT}`);
});
