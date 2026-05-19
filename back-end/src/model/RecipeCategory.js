const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const recipeCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const RecipeCategory = mongoose.model("recipe", recipeCategorySchema);
module.exports = RecipeCategory;
