const express = require("express");
const recipeController = require("../controller/recipeController");
const validateId = require("../middleware/validateId");
const validatePayload = require("../middleware/validatePayload");
const { recipeSchema, recipeUpdateSchema } = require("../validators/recipeValidator");

const router = express.Router();

router.post("/", validatePayload(recipeSchema), recipeController.create);
router.get("/all", recipeController.getAll);
router.get("/:id", validateId, recipeController.getById);
router.put("/:id", validateId, validatePayload(recipeUpdateSchema), recipeController.update);
router.delete("/:id", validateId, recipeController.remove);

module.exports = router;
