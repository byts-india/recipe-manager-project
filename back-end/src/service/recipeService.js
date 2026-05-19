const mongoose = require("mongoose");

function getRecipeModel() {
  if (mongoose.models.recipe) {
    mongoose.deleteModel("recipe");
  }
  const recipeModelPath = require.resolve("../model/Recipe");
  delete require.cache[recipeModelPath];
  return require("../model/Recipe");
}

async function createRecipe(payload) {
  const Recipe = getRecipeModel();
  return Recipe.create(payload);
}

async function getAllRecipes() {
  const Recipe = getRecipeModel();
  return Recipe.find();
}

async function getRecipeById(id) {
  const Recipe = getRecipeModel();
  return Recipe.findById(id);
}

async function updateRecipe(id, payload) {
  const Recipe = getRecipeModel();
  return Recipe.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

async function deleteRecipe(id) {
  const Recipe = getRecipeModel();
  return Recipe.findByIdAndDelete(id);
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
