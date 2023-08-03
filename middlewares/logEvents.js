const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

//Custom Log events

const customLogEvent = async (msg, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${msg}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      `${logItem}\n`
    );
  } catch (error) {
    if (error) throw error;
  }
};

//Middleware logic it's common logic that we call before every request like if we want check the user is authorized or not for every request that kind of logic will be added.
const logger = (req, res, next) => {
  customLogEvent(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  next();
};

module.exports = { logger, customLogEvent };
