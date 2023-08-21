import joi from "joi";

//Company
const companyValidation = joi.object({
  name: joi.string().required().min(3),
  email: joi
    .string()
    .email()
    .lowercase()
    .required()
    .pattern(new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")),
  address: joi.object({
    line1: joi.string().required(),
    line2: joi.string(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    zip: joi.number().required(),
  }),
  contact: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  status: joi.string().valid("ACTIVE", "INACTIVE").required(),
});

const statusValidation = joi.object({
  status: joi.string().valid("ACTIVE", "INACTIVE").required(),
});

//Employee
const empValidation = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi
    .string()
    .lowercase()
    .required()
    .pattern(new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")),
  password: joi.string().required(),
  designation: joi
    .string()
    .valid("MANAGER", "TEAM_LEADER", "DEVELOPER")
    .required(),
  companyId: joi.string().required(),
  isVerified: joi.bool().required(),
});

const designationValidation = joi.object({
  designation: joi
    .string()
    .valid("MANAGER", "TEAM_LEADER", "DEVELOPER")
    .required(),
});

export {
  companyValidation,
  empValidation,
  statusValidation,
  designationValidation,
};
