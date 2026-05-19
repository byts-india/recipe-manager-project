const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  age: {
    type: Number,
    required: true,
    min: [5, "should have min age 5 "],
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return;
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
});

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("user", userSchema);
module.exports = User;