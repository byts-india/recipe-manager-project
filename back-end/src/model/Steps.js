const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const stepsSchema = new mongoose.Schema({
  order: { type: Number, min: 1, default: 1, index: true },
  description: String,
  category: { type: String, enum: ["START", "MID", "END"] },
});

const Steps = mongoose.model("steps", stepsSchema);
module.exports = Steps;
