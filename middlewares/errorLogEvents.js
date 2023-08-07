const { logger } = require("../logger");

const errorEvents = (err, req, res, next) => {
  // customLogEvent(`${err.name}\t${err.message}`, "error.log");
  logger.log({ message: `${err.name}\t${err.message}`, level: "error" });
  res.status(500).send(err.message);
};

module.exports = { errorEvents };
