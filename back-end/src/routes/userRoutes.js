const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/all", userController.getAll);
router.get("/all/age", userController.getByCondition);
router.get("/:id", userController.getById);
router.put("/email/:id", userController.updateEmail);
router.put("/name/:id", userController.updateName);
router.put("/age/:id", userController.updateAge);
router.delete("/:id", userController.deleteUser);

module.exports = router;
