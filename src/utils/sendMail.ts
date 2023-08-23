import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

//For create the dynamic template for the email

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//first read the html file which is need to send on email
const dynamicTemplateFile = fs.readFileSync(
  path.join(__dirname, "..", "templates", "register.html"),
  "utf-8"
);

//create template by handlebars
const template = handlebars.compile(dynamicTemplateFile);

//Register oAuth
const oAuth2Client = new google.auth.OAuth2(
  process.env.EMP_CLIENT_ID,
  process.env.EMP_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//set credential with refresh token
oAuth2Client.setCredentials({ refresh_token: process.env.EMP_REFRESH_TOKEN });

//Main function will called whenever want send mail
const sendMail = async (email: string) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    //Create nodemailer transport for send mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "avesh.webosmotic@gmail.com",
        clientId: process.env.EMP_CLIENT_ID,
        clientSecret: process.env.EMP_CLIENT_SECRET,
        refreshToken: process.env.EMP_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as TransportOptions);

    // html template dynamic variable that require in html file
    const htmlOptions = template({ email: email });

    //Message body
    const options = {
      from: "avesh.webosmotic@gmail.com",
      to: email,
      subject: "Employee Email verification",
      html: htmlOptions,
    };

    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    return error;
  }
};

export default sendMail;
