const express = require("express");
const router = express.Router();
const {
  saveRecipe,
  getSavedRecipes,
  deleteSavedRecipe,
} = require("../controllers/saved.controller");
const { protect } = require("../middlewares/authMiddleware");

// Save a recipe
router.post("/", protect, saveRecipe);

// Get all saved recipes
router.get("/", protect, getSavedRecipes);

// Delete a saved recipe by mealId
router.delete("/:mealId", protect, deleteSavedRecipe);

module.exports = router;
