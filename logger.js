const winston = require("winston");

//Winston configuration object
const logConfiguration = {
  transports: [
    //for create first console log
    // new winston.transports.Console(),
    new winston.transports.File({
      level: "info",
      filename: "./logs/logged.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "./logs/error.log",
    }),
  ],
};

//Then pass configuration and create logger
const logger = winston.createLogger(logConfiguration);

module.exports = { logger };

// //create log
// logger.log({
//   message: "Hello, winston!",

//   //log level
//   level: "info",
// });
