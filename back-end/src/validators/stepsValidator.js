const Joi = require("joi");

const stepsSchema = Joi.object({
  order: Joi.number().integer().min(1).default(1).messages({
    "number.min": "order must be at least 1",
  }),
  description: Joi.string().optional(),
  category: Joi.string().valid("START", "MID", "END").optional().messages({
    "any.only": "category must be one of START, MID, END",
  }),
});

const stepsUpdateSchema = stepsSchema;

module.exports = { stepsSchema, stepsUpdateSchema };
