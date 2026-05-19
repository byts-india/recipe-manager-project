const User = require("../model/User");

async function register(firstName, lastName, age, email, password) {
  const newUser = {
    name: { firstName, lastName },
    age,
    email,
    password,
  };
  await User.insertOne(newUser);
}
async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user with email not found");
  }
  const result = await user.validatePassword(password);
  if (!result) {
    throw new Error("password is wrong");
  }
}
async function updateEmail(id, newEmail) {
  await User.findByIdAndUpdate(id, { email: newEmail });
}
async function updateName(id, name) {
  await User.findByIdAndUpdate(id, {
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
    },
  });
}
async function updateAge(id, newAge) {
  await User.findByIdAndUpdate(id, { age: newAge });
}
async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}
async function getAllUser() {
  await User.find().select({ password: 0 });
}
async function getUserById(id) {
  await User.findById(id).select({ password: 0 });
}
module.exports = {
  login,
  register,
  updateEmail,
  updateName,
  updateAge,
  deleteUser,
  getAllUser,
  getUserById,
};
