const express = require("express");
const userController = require("../controller/userController");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/all", userController.getAll);
router.get("/all/age", userController.getByCondition);
router.get("/:id", validateId, userController.getById);
router.put("/email/:id", validateId, userController.updateEmail);
router.put("/name/:id", validateId, userController.updateName);
router.put("/age/:id", validateId, userController.updateAge);
router.delete("/:id", validateId, userController.deleteUser);

module.exports = router;
