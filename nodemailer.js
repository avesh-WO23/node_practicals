const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// it will consist the email body what and whom we want send
const sendMail = async (options) => {
  try {
    //for get the access token of the oAuth playground
    const accessToken = await oAuth2Client.getAccessToken();

    //Transport is use for sending email it verify the authorized user mail of the oAuth
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "avesh.webosmotic@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const result = await transport.sendMail(options);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
