const Joi = require("joi");

const objectId = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/)
  .message("must be a valid ObjectId");

const recipeSchema = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.min": "title must be at least 2 characters",
    "any.required": "title is required",
  }),
  duration: Joi.object({
    value: Joi.number().min(0).default(0),
    units: Joi.string().valid("hour", "minutes").messages({
      "any.only": "units must be either 'hour' or 'minutes'",
    }),
  }),
  image: Joi.string().optional(),
  ingredients: Joi.array().items(Joi.string()).optional(),
  category_id: objectId.optional(),
  steps: Joi.array().items(objectId).optional(),
});

const recipeUpdateSchema = recipeSchema.fork(["title"], (field) =>
  field.optional()
);

module.exports = { recipeSchema, recipeUpdateSchema };
