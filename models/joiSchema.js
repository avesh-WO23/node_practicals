const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(3).max(12).required(),
  lastName: Joi.string().min(3).max(12).required(),
  birthYear: Joi.number().required(),
  maritalStatus: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string().required()),
  id: Joi.string().optional(),
});

module.exports = { employeeSchema: schema };
