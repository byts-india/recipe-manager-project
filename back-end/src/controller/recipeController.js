const recipeService = require("../service/recipeService");
const { successResponse, failureResponse } = require("../utils/ResponseUtil");

module.exports.create = async (req, res) => {
  try {
    // If an image was uploaded, store its filename in the payload
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const createdRecipe = await recipeService.createRecipe(req.body);
    successResponse(res, "recipe created", createdRecipe, 201);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    successResponse(res, "fetched all recipes", recipes, 200);
  } catch (error) {
    failureResponse(res, error.message, 500);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return failureResponse(res, "recipe not found", 404);
    }
    successResponse(res, "fetched recipe", recipe, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.update = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);
    if (!updatedRecipe) {
      return failureResponse(res, "recipe not found", 404);
    }
    successResponse(res, "recipe updated", updatedRecipe, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);
    if (!deletedRecipe) {
      return failureResponse(res, "recipe not found", 404);
    }
    successResponse(res, "recipe deleted", deletedRecipe, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};
