const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipe.controller");
const upload = require("../middleware/upload.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

router.post(
  "/create",
  protect,
  authorize("chef"),
  upload.single("image"),
  recipeController.createRecipe
);

router.get("/", recipeController.getRecipes);

router.put(
  "/:id",
  protect,
  authorize("chef"),
  upload.single("image"),
  recipeController.updateRecipe
);

router.delete(
  "/:id",
  protect,
  authorize("chef"),
  recipeController.deleteRecipe
);

module.exports = router;