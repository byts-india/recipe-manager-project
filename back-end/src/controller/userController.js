const userService = require("../service/UserService");
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
    const { email, password } = req.body;
    await userService.login(email, password);
    successResponse(res, "login is valid", null, 200);
  } catch (error) {
    console.log(error);
    failureResponse(res, error.message, 401);
  }
};
