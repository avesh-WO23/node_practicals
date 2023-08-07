const { logger } = require("../utils/logger");

const errorEvents = (err, req, res, next) => {
  logger.error({ message: `${err.name} ${err.message}` });
  res.status(500).send(err.message);
};

module.exports = { errorEvents };
