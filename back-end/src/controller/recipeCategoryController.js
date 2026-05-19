const recipeCategoryService = require("../service/recipeCategoryService");
const { successResponse, failureResponse } = require("../utils/ResponseUtil");

module.exports.create = async (req, res) => {
  try {
    const createdCategory = await recipeCategoryService.createRecipeCategory(req.body);
    successResponse(res, "recipe category created", createdCategory, 201);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const categories = await recipeCategoryService.getAllRecipeCategories();
    successResponse(res, "fetched all recipe categories", categories, 200);
  } catch (error) {
    failureResponse(res, error.message, 500);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const category = await recipeCategoryService.getRecipeCategoryById(req.params.id);
    if (!category) {
      return failureResponse(res, "recipe category not found", 404);
    }
    successResponse(res, "fetched recipe category", category, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedCategory = await recipeCategoryService.updateRecipeCategory(
      req.params.id,
      req.body
    );
    if (!updatedCategory) {
      return failureResponse(res, "recipe category not found", 404);
    }
    successResponse(res, "recipe category updated", updatedCategory, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deletedCategory = await recipeCategoryService.deleteRecipeCategory(
      req.params.id
    );
    if (!deletedCategory) {
      return failureResponse(res, "recipe category not found", 404);
    }
    successResponse(res, "recipe category deleted", deletedCategory, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};
