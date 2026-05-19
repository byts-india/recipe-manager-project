const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.min": "firstName must be at least 2 characters",
    "string.max": "firstName must be at most 50 characters",
    "any.required": "firstName is required",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.min": "lastName must be at least 2 characters",
    "string.max": "lastName must be at most 50 characters",
    "any.required": "lastName is required",
  }),
  age: Joi.number().integer().min(5).required().messages({
    "number.min": "age must be at least 5",
    "any.required": "age is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email address",
    "any.required": "email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password must be at least 6 characters",
    "any.required": "password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email address",
    "any.required": "email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
});

module.exports = { registerSchema, loginSchema };
