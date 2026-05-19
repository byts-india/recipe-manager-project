const Joi = require("joi");

const recipeCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "name must be at least 2 characters",
    "string.max": "name must be at most 100 characters",
    "any.required": "name is required",
  }),
  description: Joi.string().max(500).optional().messages({
    "string.max": "description must be at most 500 characters",
  }),
});

const recipeCategoryUpdateSchema = recipeCategorySchema.fork(
  ["name"],
  (field) => field.optional()
);

module.exports = { recipeCategorySchema, recipeCategoryUpdateSchema };
