const mongoose = require("mongoose");
const Recipe = require("../model/Recipe");

async function createRecipe(payload) {
  return Recipe.create(payload);
}

async function getAllRecipes() {
  return Recipe.find();
}

async function getRecipeById(id) {
  return Recipe.findById(id).populate(["steps"]);
}

async function updateRecipe(id, payload) {
  return Recipe.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

async function deleteRecipe(id) {
  return Recipe.findByIdAndDelete(id);
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
