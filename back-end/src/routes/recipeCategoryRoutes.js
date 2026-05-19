const express = require("express");
const recipeCategoryController = require("../controller/recipeCategoryController");

const router = express.Router();

router.post("/", recipeCategoryController.create);
router.get("/all", recipeCategoryController.getAll);
router.get("/:id", recipeCategoryController.getById);
router.put("/:id", recipeCategoryController.update);
router.delete("/:id", recipeCategoryController.remove);

module.exports = router;
