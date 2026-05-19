const express = require("express");
const stepsController = require("../controller/stepsController");
const validateId = require("../middleware/validateId");
const validatePayload = require("../middleware/validatePayload");
const { stepsSchema, stepsUpdateSchema } = require("../validators/stepsValidator");

const router = express.Router();

router.post("/", validatePayload(stepsSchema), stepsController.create);
router.get("/all", stepsController.getAll);
router.get("/:id", validateId, stepsController.getById);
router.put("/:id", validateId, validatePayload(stepsUpdateSchema), stepsController.update);
router.delete("/:id", validateId, stepsController.remove);

module.exports = router;
