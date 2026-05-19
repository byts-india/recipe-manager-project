const mongoose = require("mongoose");

function getStepsModel() {
  if (mongoose.models.recipe) {
    mongoose.deleteModel("recipe");
  }
  const stepsModelPath = require.resolve("../model/Steps");
  delete require.cache[stepsModelPath];
  return require("../model/Steps");
}

async function createStep(payload) {
  const Steps = getStepsModel();
  return Steps.create(payload);
}

async function getAllSteps() {
  const Steps = getStepsModel();
  return Steps.find();
}

async function getStepById(id) {
  const Steps = getStepsModel();
  return Steps.findById(id);
}

async function updateStep(id, payload) {
  const Steps = getStepsModel();
  return Steps.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

async function deleteStep(id) {
  const Steps = getStepsModel();
  return Steps.findByIdAndDelete(id);
}

module.exports = {
  createStep,
  getAllSteps,
  getStepById,
  updateStep,
  deleteStep,
};
