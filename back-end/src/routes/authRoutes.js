const express = require("express");
const { login, register } = require("../controller/userController");
const validatePayload = require("../middleware/validatePayload");
const { registerSchema, loginSchema } = require("../validators/userValidator");

const router = express.Router();

router.post("/login", validatePayload(loginSchema), login);
router.post("/register", validatePayload(registerSchema), register);

module.exports = router;
