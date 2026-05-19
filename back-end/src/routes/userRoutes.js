const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/:id", userController.getById);
router.get("/all", userController.getAll);
router.put("/email", userController.updateEmail);
router.put("/name", userController.updateName);
router.put("/age", userController.updateAge);
router.delete("/:id", userController.deleteUser);

module.exports = router;
