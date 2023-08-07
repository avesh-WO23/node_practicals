const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const { logger } = require("../utils/logger");

//Custom Log events

const customLogEvent = (msg) => {
  const logItem = `${uuid()} ${msg}`;
  logger.info({ message: logItem });
};

//Middleware logic it's common logic that we call before every request like if we want check the user is authorized or not for every request that kind of logic will be added.
const logged = (req, res, next) => {
  customLogEvent(`${req.method} ${req.headers.origin} ${req.url}`);
  next();
};

module.exports = { logged };
