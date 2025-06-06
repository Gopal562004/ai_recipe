const Saved = require("../models/saved.model");

const saveRecipe = async (req, res) => {
  try {
    const { mealId, mealName, mealThumb, category, tags } = req.body;

    const alreadyExists = await Saved.findOne({
      user: req.user._id,
      mealId,
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    const savedRecipe = await Saved.create({
      user: req.user.id,
      mealId,
      mealName,
      mealThumb,
      category,
      tags,
    });

    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc    Get all saved recipes for a user
// @route   GET /api/saved
// @access  Private
const getSavedRecipes = async (req, res) => {
  try {
    const saved = await Saved.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a saved recipe
// @route   DELETE /api/saved/:mealId
// @access  Private
const deleteSavedRecipe = async (req, res) => {
  try {
    const { mealId } = req.params;

    const deleted = await Saved.findOneAndDelete({
      user: req.user.id,
      mealId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Recipe not found in saved list" });
    }

    res.status(200).json({ message: "Recipe removed from saved" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  saveRecipe,
  getSavedRecipes,
  deleteSavedRecipe,
};
