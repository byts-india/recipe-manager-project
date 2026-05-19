const stepsService = require("../service/stepsService");
const { successResponse, failureResponse } = require("../utils/ResponseUtil");

module.exports.create = async (req, res) => {
  try {
    const createdStep = await stepsService.createStep(req.body);
    successResponse(res, "step created", createdStep, 201);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const steps = await stepsService.getAllSteps();
    successResponse(res, "fetched all steps", steps, 200);
  } catch (error) {
    failureResponse(res, error.message, 500);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const step = await stepsService.getStepById(req.params.id);
    if (!step) {
      return failureResponse(res, "step not found", 404);
    }
    successResponse(res, "fetched step", step, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedStep = await stepsService.updateStep(req.params.id, req.body);
    if (!updatedStep) {
      return failureResponse(res, "step not found", 404);
    }
    successResponse(res, "step updated", updatedStep, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deletedStep = await stepsService.deleteStep(req.params.id);
    if (!deletedStep) {
      return failureResponse(res, "step not found", 404);
    }
    successResponse(res, "step deleted", deletedStep, 200);
  } catch (error) {
    failureResponse(res, error.message, 400);
  }
};
