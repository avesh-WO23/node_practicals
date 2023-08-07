const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const { logger } = require("../logger");

//Custom Log events

const customLogEvent = (msg) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime} ${uuid()} ${msg}`;
  // try {
  //   if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
  //     await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
  //   }
  //   await fsPromises.appendFile(
  //     path.join(__dirname, "..", "logs", logName),
  //     `${logItem}\n`
  //   );
  // } catch (error) {
  //   if (error) throw error;
  // }
  logger.log({ message: logItem, level: "info" });
};

//Middleware logic it's common logic that we call before every request like if we want check the user is authorized or not for every request that kind of logic will be added.
const logged = (req, res, next) => {
  customLogEvent(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "logged.log"
  );
  next();
};

module.exports = { logged };
