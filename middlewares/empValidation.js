const { employeeSchema } = require("../models/joiSchema");

const validationMiddleware = (req, res, next) => {
  const response = employeeSchema.validate(req.body);
  if (response.error) {
    return res.status(404).send(response.error.message);
  }
  next();
};

module.exports = { validationMiddleware };
