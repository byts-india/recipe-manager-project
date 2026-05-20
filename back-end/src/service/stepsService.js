const mongoose = require("mongoose");
const Steps = require("../model/Steps");


async function createStep(payload) {
  return Steps.create(payload);
}

async function getAllSteps() {
  return Steps.find();
}

async function getStepById(id) {
  return Steps.findById(id);
}

async function updateStep(id, payload) {
  return Steps.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

async function deleteStep(id) {
  return Steps.findByIdAndDelete(id);
}

module.exports = {
  createStep,
  getAllSteps,
  getStepById,
  updateStep,
  deleteStep,
};
