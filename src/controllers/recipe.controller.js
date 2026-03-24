const Recipe = require("../models/recipe.model");

// Create recipe
exports.createRecipe = async (req, res) => {
  const recipe = await Recipe.create({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    image: req.file?.path,
    createdBy: req.user.id,
  });

  res.json(recipe);
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find().populate("createdBy", "name");
  res.json(recipes);
};

// Update
exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) return res.status(404).json({ message: "Not found" });

  if (recipe.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  Object.assign(recipe, req.body);

  if (req.file) recipe.image = req.file.path;

  await recipe.save();

  res.json(recipe);
};

// Delete
exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) return res.status(404).json({ message: "Not found" });

  await recipe.deleteOne();

  res.json({ message: "Deleted" });
};