const express = require("express");
const recipeController = require("../controller/recipeController");
const upload = require("../middleware/upload.middleware");
const validateId = require("../middleware/validateId");
const validatePayload = require("../middleware/validatePayload");
const { recipeSchema, recipeUpdateSchema } = require("../validators/recipeValidator");

const router = express.Router();

function normalizeRecipePayload(req, res, next) {
	if (typeof req.body.duration === "string") {
		try {
			req.body.duration = JSON.parse(req.body.duration);
		} catch (error) {
			req.body.duration = undefined;
		}
	}

	if (!req.body.duration && (req.body.durationValue || req.body.durationUnits)) {
		req.body.duration = {
			value: Number(req.body.durationValue || 0),
			units: req.body.durationUnits || "minutes",
		};
	}

	if (typeof req.body.ingredients === "string") {
		req.body.ingredients = req.body.ingredients
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
	}

	next();
}

router.post("/", upload.single("image"), normalizeRecipePayload, validatePayload(recipeSchema), recipeController.create);
router.get("/all", recipeController.getAll);
router.get("/:id", validateId, recipeController.getById);
router.put("/:id", validateId, upload.single("image"), normalizeRecipePayload, validatePayload(recipeUpdateSchema), recipeController.update);
router.delete("/:id", validateId, recipeController.remove);

module.exports = router;
