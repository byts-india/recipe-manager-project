const express = require("express");
const recipeCategoryController = require("../controller/recipeCategoryController");
const validateId = require("../middleware/validateId");
const validatePayload = require("../middleware/validatePayload");
const { recipeCategorySchema, recipeCategoryUpdateSchema } = require("../validators/recipeCategoryValidator");

const router = express.Router();

router.post("/", validatePayload(recipeCategorySchema), recipeCategoryController.create);
router.get("/all", recipeCategoryController.getAll);
router.get("/:id", validateId, recipeCategoryController.getById);
router.put("/:id", validateId, validatePayload(recipeCategoryUpdateSchema), recipeCategoryController.update);
router.delete("/:id", validateId, recipeCategoryController.remove);

module.exports = router;
