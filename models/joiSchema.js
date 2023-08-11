const Joi = require("joi");

const employeeSchema = Joi.object({
  firstName: Joi.string().min(3).max(12).required(),
  lastName: Joi.string().min(3).max(12).required(),
  birthYear: Joi.number().required(),
  maritalStatus: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string().required()),
  id: Joi.string().optional(),
});

const authSchema = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(4).max(12).required(),
});

module.exports = { employeeSchema, authSchema };
