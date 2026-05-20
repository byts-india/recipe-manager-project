const userService = require("../service/userService");
const generateToken = require("../utils/jwtUtil");
const { successResponse, failureResponse } = require("../utils/ResponseUtil");

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    await userService.register(firstName, lastName, age, email, password);
    successResponse(res, "new user got created", null, 201);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 401);
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.payload);
    const { email, password } = req.body;
    await userService.login(email, password);
    const token = generateToken({
      email: email,
    });
    res.status(200).json({
      success: true,
      message: "login is valid",
      token: token,
    });
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 401);
  }
};

module.exports.updateEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.body;
    await userService.updateEmail(id, email);
    successResponse(res, "email is updated", null, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
module.exports.updateName = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    await userService.updateName(id, { firstName, lastName });
    successResponse(res, "name is updated", null, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
module.exports.updateAge = async (req, res) => {
  try {
    const id = req.params.id;
    const { age } = req.body;
    await userService.updateAge(id, age);
    successResponse(res, "age is updated", null, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    successResponse(res, "user has been deleted", null, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    successResponse(res, "fetched all users", users, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    successResponse(res, "fetched your user by id", user, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};

module.exports.getByCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const { fromAge, toAge } = req.body;
    const users = await userService.getByAge(fromAge, toAge);
    successResponse(res, "fetched your users with age range", users, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 500);
  }
};
