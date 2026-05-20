const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, minLength: 2, required: true },
    duration: {
      value: { type: Number, default: 0 },
      units: { type: String, enum: ["hour", "minutes"] },
    },
    image: String,
    ingredients: [String],
    category_id: { type: mongoose.Schema.ObjectId, ref: "recipe_category" },
    steps: [{ type: mongoose.Schema.ObjectId, ref: "steps" }],
  },
  {
    timestamps: true,
  },
);
const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
