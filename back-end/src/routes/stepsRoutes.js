const express = require("express");
const stepsController = require("../controller/stepsController");

const router = express.Router();

router.post("/", stepsController.create);
router.get("/all", stepsController.getAll);
router.get("/:id", stepsController.getById);
router.put("/:id", stepsController.update);
router.delete("/:id", stepsController.remove);

module.exports = router;
