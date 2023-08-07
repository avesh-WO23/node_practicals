const { createLogger, format, transports } = require("winston");
const path = require("path");

//Winston configuration object
const logConfiguration = {
  transports: [
    new transports.File({
      level: "info",
      filename: path.join(__dirname, "..", "logs", "logged.log"),
      format: format.combine(
        format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      level: "error",
      filename: path.join(__dirname, "..", "logs", "error.log"),
      format: format.combine(
        format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
};

//Then pass configuration and create logger
const logger = createLogger(logConfiguration);

module.exports = { logger };

// //create log
// logger.log({
//   message: "Hello, winston!",

//   //log level
//   level: "info",
// });
