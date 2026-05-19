const mongoose = require("mongoose");

function getRecipeCategoryModel() {
  if (mongoose.models.recipe) {
    mongoose.deleteModel("recipe");
  }
  const recipeCategoryModelPath = require.resolve("../model/RecipeCategory");
  delete require.cache[recipeCategoryModelPath];
  return require("../model/RecipeCategory");
}

async function createRecipeCategory(payload) {
  const RecipeCategory = getRecipeCategoryModel();
  return RecipeCategory.create(payload);
}

async function getAllRecipeCategories() {
  const RecipeCategory = getRecipeCategoryModel();
  return RecipeCategory.find();
}

async function getRecipeCategoryById(id) {
  const RecipeCategory = getRecipeCategoryModel();
  return RecipeCategory.findById(id);
}

async function updateRecipeCategory(id, payload) {
  const RecipeCategory = getRecipeCategoryModel();
  return RecipeCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

async function deleteRecipeCategory(id) {
  const RecipeCategory = getRecipeCategoryModel();
  return RecipeCategory.findByIdAndDelete(id);
}

module.exports = {
  createRecipeCategory,
  getAllRecipeCategories,
  getRecipeCategoryById,
  updateRecipeCategory,
  deleteRecipeCategory,
};
