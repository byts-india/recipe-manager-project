const express = require("express");
const recipeController = require("../controller/recipeController");

const router = express.Router();

router.post("/", recipeController.create);
router.get("/all", recipeController.getAll);
router.get("/:id", recipeController.getById);
router.put("/:id", recipeController.update);
router.delete("/:id", recipeController.remove);

module.exports = router;
