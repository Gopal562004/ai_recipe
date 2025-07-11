const express = require("express");
const router = express.Router();
const { generateRecipe } = require("../controllers/ai-generate.controller");

router.post("/generate-recipe", generateRecipe);

module.exports = router;
