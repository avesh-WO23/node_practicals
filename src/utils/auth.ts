import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//config for enable env
dotenv.config();

const ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;

//Access token
export const signAccessToken = ({
  email,
  employeeId,
}: {
  email: string;
  employeeId: string;
}) => {
  return new Promise((res, rej) => {
    const payload = {
      email,
    };
    const options = {
      expiresIn: "30s",
      audience: employeeId,
    };
    jwt.sign(payload, ACCESS_TOKEN_SECRET, options, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};

//Refresh Token
export const signRefreshToken = ({
  email,
  employeeId,
}: {
  email: string;
  employeeId: string;
}) => {
  return new Promise((res, rej) => {
    const payload = {
      email,
    };
    const options = {
      expiresIn: "1y",
      audience: employeeId,
    };
    jwt.sign(payload, REFRESH_TOKEN_SECRET, options, (err, decode) => {
      if (err) rej(err);
      res(decode);
    });
  });
};
